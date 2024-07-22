import { AuthChecker } from 'type-graphql';
import { jwtVerify } from 'jose';
import { MyContext } from '..';
import UserService from '../services/user-service';
import User from '../entities/user/user';

interface Payload {
  email: string;
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined');
    }
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify<Payload>(token, secret);
    return await UserService.readByMail(payload.email);
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

const customAuthChecker: AuthChecker<MyContext> = async ({ context }) => {
  if (context.user) {
    return true;
  }

  const tokenInAuthHeaders = context.req.headers.authorization?.split(' ')[1];
  if (tokenInAuthHeaders) {
    const user = await verifyToken(tokenInAuthHeaders);
    context.user = user;
    return !!user;
  }

  return false;
};

export default customAuthChecker;
