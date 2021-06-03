import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { InvalidTokenError } from 'src/errors/invalid-login-token.error';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { CreateUserDto } from '../user/dtos/create-user.dto';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.SOCIAL_LOGIN_JSON_PATH),
    });
  }

  public async verifyToken(token: string): Promise<CreateUserDto> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      const userName = decodedToken.name;
      const profilePicture = decodedToken.picture;
      const email = decodedToken.email;

      const ret: CreateUserDto = {
        userName,
        email,
        profilePicture,
        role: UserRoles.USER,
      };

      return ret;
    } catch (error) {
      if (error.code === 'auth/argument-error') {
        throw new InvalidTokenError();
      }

      throw error;
    }
  }
}
