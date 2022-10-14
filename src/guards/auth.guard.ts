import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from '~src/lib';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authToken = request.headers.authorization;
      const decoded = await Auth.decode(authToken);
      request.auth = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
