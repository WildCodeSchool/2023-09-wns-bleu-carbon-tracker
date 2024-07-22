import { SignJWT } from 'jose';
import User from '../../src/entities/user/user';

async function generateAuthToken(user: User) {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined');
  }
  const secret = new TextEncoder().encode(secretKey);
  const token = await new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret);
  return token;
}

export default generateAuthToken;
