/* istanbul ignore file */
import {AuthenticateFn, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {
  DefaultSequence, ExpressRequestHandler, FindRoute, HttpErrors,
  InvokeMethod,
  ParseParams,
  Reject,

  RequestContext,
  RestBindings,
  Send,
  SequenceHandler
} from '@loopback/rest';
import cors from 'cors';

const middlewareList: ExpressRequestHandler[] = [
  cors(),
];
const SequenceActions = RestBindings.SequenceActions;
export class PhoneQASequence extends DefaultSequence implements  SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,

  ) {super(findRoute,parseParams,invoke,send,reject)}
  async handle(context: RequestContext): Promise<void> {
    try {
      const {request, response} = context;

      await this.invokeMiddleware(context, middlewareList);

      if (request.method==='OPTIONS') {
        return;
      }

      const route = this.findRoute(request);

      const authUser=await this.authenticateRequest(request);
      console.log(new Date,authUser,request.method,request.originalUrl);
      const args = await this.parseParams(request, route);

      const result = await this.invoke(route, args);
      this.send(response, result);

    } catch (error) {
      console.error(error)
      let informativeError
      if (!error.status || error.status === 500) {
        const errorContent = error.details?.length
            ? error.details[0]
            : error.message || error

        informativeError = new HttpErrors.BadRequest(JSON.stringify(errorContent))
      }
      this.reject(context, informativeError ?? error);
    }
  }
}
