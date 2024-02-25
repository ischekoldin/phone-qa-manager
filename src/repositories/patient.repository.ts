// /* eslint-disable @typescript-eslint/naming-convention */
//
// import {inject} from '@loopback/core';
// import {DataObject, DefaultCrudRepository, EntityNotFoundError, repository} from '@loopback/repository';
// import {ReclpuDataSource} from '@/datasources';
// import {Agreement, Patient, PatientRelations, ReclpuAgreement} from '@/models';
// import {ReclpuAgreementRepository} from "@/repositories/reclpu-agreement.repository";
// import {AgreementRepository} from "@/repositories/agreement.repository";
// import {UserprofileRepository} from "@/repositories/userprofile.repository";
//
// export class PatientRepository extends DefaultCrudRepository<
//   Patient,
//   typeof Patient.prototype.id,
//   PatientRelations
// > {
//   constructor(
//     @inject('datasources.receipt') dataSource: ReclpuDataSource,
//     @repository(ReclpuAgreementRepository)
//     private reclpuAgreementRepository: ReclpuAgreementRepository,
//     @repository(AgreementRepository)
//     private agreementRepository: AgreementRepository,
//     @repository(UserprofileRepository)
//     private userprofileRepository: UserprofileRepository
//   ) {
//     super(Patient, dataSource);
//   }
//
//   async createSyncronizedAgreement(patient: DataObject<Patient>, userId: string) {
//     let agreement: DataObject<Agreement>;
//     let reclpuAgreement: DataObject<ReclpuAgreement>;
//     let lpuCode: string;
//
//     const errPatientAndUserIdRequired = `patient data and user id are required`
//     const errFailedToCreateReclpuAgreement = ( msg: string  ) => `failed to create reclpu agreement: ${ msg }`
//     const errFailedToCreateAgreement = ( msg: string  ) => `failed to create agreement: ${ msg }`
//     const errFailedToGetLpuCode = ( msg: string  ) => `failed to get lpu code: ${ msg }`
//
//     if (!patient || !userId) {
//       throw new Error(errPatientAndUserIdRequired)
//     }
//
//     try {
//       lpuCode = await this.userprofileRepository.getLpuCode(userId)
//     } catch (e) {
//       throw new Error(errFailedToGetLpuCode(e.message))
//     }
//
//     if (!lpuCode) {
//       throw new Error(errFailedToGetLpuCode('not found'))
//     }
//
//     try {
//       reclpuAgreement = await this.reclpuAgreementRepository.create({
//         folksSnils: patient.snils,
//         agreeSer: lpuCode,
//         lpuCode,
//         agreeState: patient.agree,
//         modDate: (new Date()).toISOString()
//       })
//     } catch (e) {
//       throw new Error(errFailedToCreateReclpuAgreement(JSON.stringify(e)))
//     }
//
//     // eslint-disable-next-line prefer-const
//     agreement = {
//       folks_snils: reclpuAgreement.folksSnils,
//       agree_ser: reclpuAgreement.agreeSer,
//       agree_num: reclpuAgreement.agreeNum,
//       lpu_code: reclpuAgreement.lpuCode,
//       mod_date: reclpuAgreement.modDate,
//       agree_state: reclpuAgreement.agreeState,
//       id: reclpuAgreement.id
//     }
//
//     try {
//       await this.agreementRepository.create(agreement)
//     } catch (e) {
//       throw new Error(errFailedToCreateAgreement(JSON.stringify(e)))
//     }
//   }
//
//   async fillAgreement(patient: Patient, userId: string) {
//
//     let lpuCode, agreement
//
//     const errFailedToGetLpuCode = (msg: string) =>
//       `failed to get lpu code for user with id ${ userId }: ${ msg }`
//     const errFailedToGetPatient = (lpu: string, snils: string, msg: string) =>
//       `failed to get patient with lpu code ${ lpu } and snils ${ snils }: ${ msg }`
//     const errPatientAndUserIdAreRequired = `patient and user id are required`
//
//     if (!patient || !userId) {
//       throw new Error(errPatientAndUserIdAreRequired)
//     }
//
//     try {
//       lpuCode = await this.userprofileRepository.getLpuCode(userId);
//     } catch (e) {
//       return patient;
//       //throw new Error(errFailedToGetLpuCode(JSON.stringify(e)))
//     }
//
//     if (!lpuCode) {
//       return patient;
//       // throw new Error(errFailedToGetLpuCode('got empty string'))
//     }
//
//     try {
//       agreement = await this.reclpuAgreementRepository.findOne({
//         where: { lpuCode: lpuCode, folksSnils: patient.snils },
//         order: ['id DESC'],
//         limit: 1
//       })
//     } catch (e) {
//       throw new Error(errFailedToGetPatient(lpuCode, <string>patient.snils, JSON.stringify(e)))
//     }
//
//     if (!agreement) {
//       return patient
//       // throw new Error(errFailedToGetPatient(lpuCode, <string>patient.snils, 'not found'))
//     }
//
//     patient.agree = agreement.agreeState
//     patient.agreedate = getDatePlus25Years(agreement.modDate)
//     return patient
//   }
//
//   async upsert(patient: Patient) {
//
//     const errFailedToUpdatePatient = (msg: string, _patient: string) =>
//       `failed to update patient ${ _patient }: ${ msg }`
//     const errFailedToCreatePatient = (msg: string, _patient: string) =>
//       `failed to create patient ${ _patient }: ${ msg }`
//
//     try {
//       const updatedCount = await this.updateAll(patient, { id: patient.id })
//
//       if (updatedCount.count < 1) {
//         throw new EntityNotFoundError('Patient', patient.id)
//       }
//
//       return await this.findOne({
//         where: { id: patient.id },
//       });
//     } catch (error) {
//       if (error instanceof EntityNotFoundError) {
//         try {
//           return await this.create(patient)
//         } catch (e) {
//           throw new Error(errFailedToUpdatePatient(JSON.stringify(e), JSON.stringify(patient)));
//         }
//       } else {
//         throw new Error(errFailedToCreatePatient(JSON.stringify(error), JSON.stringify(patient)));
//       }
//     }
//   }
// }
