import {
  CanActivate,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { USER_ROLE_ADMIN } from '~src/common/contants';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request?.auth?.user?.role === USER_ROLE_ADMIN) {
      return true;
    }
    throw new BadRequestException(
      'You are not allowed to perform this operation',
    );
  }
}
