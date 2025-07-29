import * as bcrypt from 'bcryptjs'

export function hashAsync(input: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash
}

export async function compareAsync(rawString: string, hashedString: string): Promise<boolean> {
  
  const isSame = await bcrypt.compare(rawString, hashedString); // true
  
  return isSame
}


