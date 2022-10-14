import { User } from '~src/db';

export interface AuthResponse {
  user: User;
  jwtToken: string;
}
