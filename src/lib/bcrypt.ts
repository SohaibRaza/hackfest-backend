import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hash(password: string) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

export async function compare(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
