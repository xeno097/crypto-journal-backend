import { Injectable } from '@nestjs/common';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { UserRepository } from 'src/user/user.repository';
import { AuthPayloadDto } from './dtos/auth-payload.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { FirebaseAdminService } from './firebase-admin.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/shared/enums/env-keys.enum';
import { UserDto } from 'src/user/dtos/user.dto';
import { GetLoggedUserDto } from './dtos/get-logged-user.dto';
import { BlockedUserError } from 'src/errors/user/blocked-user.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  // TODO: store refresh token in db

  // TODO: remove used refresh token from db
  public async signIn(signInDto: SignInDto): Promise<[Error, AuthPayloadDto]> {
    try {
      // Get token
      const { token } = signInDto;

      // verify token
      const createUserDto = await this.firebaseAdminService.verifyToken(token);
      const { email } = createUserDto;

      // search the user by email in the db
      let [err, user] = await this.userRepository.getOneEntity({ email });

      if (err && (err as BaseError)?.code !== ErrorCode.USER_NOT_FOUND) {
        return [err, null];
      }

      // if the user does not exist create it
      if (!user) {
        [err, user] = await this.userRepository.createEntity(createUserDto);

        // TODO: send email to new users
      }

      if (err) {
        return [err, null];
      }

      // generate access token and refresh token
      const authPayloadDto: AuthPayloadDto = this.generateAuthPayload(user);

      return [null, authPayloadDto];
    } catch (error) {
      return [error, null];
    }
  }

  public async getLoggedUser(
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[Error, UserDto]> {
    try {
      const { id, email } = jwtPayloadDto;

      const getLoggedUserDto: GetLoggedUserDto = {
        id,
        email,
      };

      const [err, res] = await this.userRepository.getOneEntity(
        getLoggedUserDto,
      );

      if (err) {
        return [err, null];
      }

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async refreshToken(refreshTokenDto: {
    token: string;
  }): Promise<[Error, AuthPayloadDto]> {
    try {
      const { token } = refreshTokenDto;

      const jwtPayloadDto: JwtPayloadDto = this.jwtService.verify(token, {
        secret: this.configService.get(EnvKey.REFRESH_TOKEN_SECRET),
      });

      const { id, email } = jwtPayloadDto;

      const getLoggedUserDto: GetLoggedUserDto = {
        id,
        email,
      };

      const [err, user] = await this.userRepository.getOneEntity(
        getLoggedUserDto,
      );

      if (err) {
        return [err, null];
      }

      // return access token, refresh token and user data
      const authPayloadDto: AuthPayloadDto = this.generateAuthPayload(user);

      return [null, authPayloadDto];
    } catch (error) {
      return [error, null];
    }
  }

  private generateAuthPayload(user: UserDto): AuthPayloadDto {
    try {
      const { id, email, role, blocked } = user;

      if (blocked) {
        throw new BlockedUserError();
      }

      const jwtPayloadDto: JwtPayloadDto = { id, role, email };

      const accessToken = this.jwtService.sign(jwtPayloadDto);
      const refreshToken = this.jwtService.sign(jwtPayloadDto, {
        secret: this.configService.get(EnvKey.REFRESH_TOKEN_SECRET),
        expiresIn: this.configService.get(EnvKey.REFRESH_TOKEN_EXP),
      });

      // return access token, refresh token and user data
      const authPayloadDto: AuthPayloadDto = {
        accessToken,
        refreshToken,
        user,
      };

      return authPayloadDto;
    } catch (error) {
      throw error;
    }
  }
}
