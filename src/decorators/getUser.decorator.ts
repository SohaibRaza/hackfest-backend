import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '~src/lib';

export const GetUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    try {
      const request = context.switchToHttp().getRequest();
      const authToken = request.headers.authorization;

      if (!authToken) return null;

      const decoded = await Auth.decode(authToken);
      return (decoded as GenericObject)?.user;
    } catch (error) {
      return null;
    }
  },
);
