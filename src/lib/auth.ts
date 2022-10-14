import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '~src/db';

export class Auth {
  static EXPIRY_SECONDS: number = 60 * 60 * 24 * 7;

  static async decode(token: string): Promise<GenericObject | string | null> {
    const decode = jsonwebtoken.verify(
      token.split(' ')[1],
      process.env.JWT_SECRET,
    );
    console.log('de', decode);
    return decode;
  }

  static async sign(attrs: GenericObject, opts?): Promise<string> {
    const expiry =
      attrs.exp || Math.floor(Date.now() / 1000) + this.EXPIRY_SECONDS;

    console.log('exp', expiry);

    return jsonwebtoken.sign(
      {
        exp: expiry,
        ...attrs,
      },
      process.env.JWT_SECRET,
      opts,
    );
  }

  static async generateToken(
    user: User,
    opts?: { exp: number },
  ): Promise<string> {
    return this.sign({
      userId: user.id,
      ...(opts?.exp && { exp: opts.exp }),
    });
  }

  static async formatAuthResponse(
    user: User,
  ): Promise<{ user: User; jwtToken?: string }> {
    user.password = undefined;
    const response = {
      user: user,
      jwtToken: await this.sign({ user }),
    };

    return response;
  }
}
