import * as bcrypt from 'bcrypt';

export async function enCrypt(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function deCrypt(password: string, has: string) {
  return await bcrypt.compare(password, has);
}
