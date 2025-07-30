import * as bcrypt from 'bcrypt';

export async function hashAsync(rawString: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rawString, salt);
}

export async function compareAsync(rawString: string, hashedString: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(rawString, hashedString);
  return isMatch
}