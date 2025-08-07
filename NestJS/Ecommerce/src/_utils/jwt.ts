import { JwtService } from "@nestjs/jwt";

export async function generateJWT(id: number, username: string, jwtService: JwtService): Promise<string> {
  const payload = { sub: id, username: username };
  return  await jwtService.signAsync(payload)
}