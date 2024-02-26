import 'module-alias/register';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
import {beforeEach} from 'mocha';
import {PhoneService} from '@/services';
import {PhoneRepository} from '@/repositories';
import {PhoneRepositoryStub} from '@/__tests__/helpers/stubs/repositories/phone-repository.stub';
import {securityId, UserProfile} from '@loopback/security';

describe('PhoneService', () => {
  let phoneService: PhoneService;
  const userProfile: UserProfile = {
    [securityId]: `1`,
  }

  beforeEach(() => {
    phoneService = new PhoneService(<PhoneRepository><unknown>new PhoneRepositoryStub(), userProfile)
  })

  it('should return an available phone', async () =>{
    const phones = await phoneService.listAvailable();
    expect(phones)
      .to.have.property('length')
      .that.is.eq(1);
    expect(phones[0])
      .to.have.property('id')
      .that.is.eq(7)
  });

  it('should return an unavailable phone', async () =>{
    const phones = await phoneService.listReserved();
    expect(phones)
      .to.have.property('length')
      .that.is.eq(1);
    expect(phones[0])
      .to.have.property('id')
      .that.is.eq(6)
  });

  it('should reserve a phone', async () =>{
    const phone = await phoneService.reserve(7);
    expect(phone).to.have.property('reserved').that.is.eq(true);
    expect(phone).to.have.property('reservedById').that.is.eq(1);
    expect(phone).to.have.property('reservedTs').that.is.not.null;
  });

  it('should fail to reserve a non-existent phone', async () =>{
    let error;
    try {
      await phoneService.reserve(9)
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceof(Error);
    expect(error?.message).to.be.eq('failed to reserve the phone with id 9: id is invalid or the phone is already reserved');
  });

  it('should fail to reserve a reserved phone', async () =>{
    let error;
    try {
      await phoneService.reserve(6)
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceof(Error);
    expect(error?.message).to.be.eq('failed to reserve the phone with id 6: id is invalid or the phone is already reserved');
  });

  it('should return a phone', async () =>{
    const phone = await phoneService.return(6);
    expect(phone).to.have.property('reserved').that.is.eq(false);
    expect(phone).to.have.property('reservedById').that.is.null;
    expect(phone).to.have.property('reservedTs').that.is.null;
  });

  it('should fail to return a non-existent phone', async () =>{
    let error;
    try {
      await phoneService.return(9)
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceof(Error);
    expect(error?.message).to.be.eq('failed to return the phone with id 9: id is invalid or the phone is not reserved');
  });

  it('should fail to return a non-reserved phone', async () =>{
    let error;
    try {
      await phoneService.return(7)
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceof(Error);
    expect(error?.message).to.be.eq('failed to return the phone with id 7: id is invalid or the phone is not reserved');
  });
})