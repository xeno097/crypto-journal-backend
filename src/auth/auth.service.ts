import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { BlockedUserError } from 'src/errors/user/blocked-user.error';
import { EnvKey } from 'src/shared/enums/env-keys.enum';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UpdateUserPayloadDto } from 'src/user/dtos/update-user.payload';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserRepository } from 'src/user/user.repository';
import { AuthPayloadDto } from './dtos/auth-payload.dto';
import { GetLoggedUserDto } from './dtos/get-logged-user.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  public async signIn(
    signInDto: SignInDto,
  ): Promise<[BaseError, AuthPayloadDto]> {
    // Get token
    const { token } = signInDto;

    // verify token
    const createUserDto = await this.firebaseAdminService.verifyToken(token);
    const { email } = createUserDto;

    // search the user by email in the db
    let [err, user] = await this.userRepository.getOneEntity({ email });

    if (err && (err as BaseError)?.code !== ErrorCode.ENTITY_NOT_FOUND) {
      return [err, null];
    }

    // if the user does not exist create it
    if (!user) {
      [err, user] = await this.userRepository.createEntity(createUserDto);
    }

    if (err) {
      return [err, null];
    }

    // generate access token and refresh token
    const res = this.generateAuthPayload(user);

    return res;
  }

  public async getLoggedUser(
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[BaseError, UserDto]> {
    const { id, email } = jwtPayloadDto;

    const getLoggedUserDto: GetLoggedUserDto = {
      id,
      email,
    };

    const res = await this.userRepository.getOneEntity(getLoggedUserDto);

    return res;
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<[BaseError, AuthPayloadDto]> {
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
      const res = this.generateAuthPayload(user);

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  private generateAuthPayload(user: UserDto): [BaseError, AuthPayloadDto] {
    const { id, email, role, blocked } = user;

    if (blocked) {
      return [new BlockedUserError(), null];
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

    return [null, authPayloadDto];
  }

  public async updateLoggedUser(
    updateUserPayloadDto: UpdateUserPayloadDto,
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[BaseError, UserDto]> {
    const { id } = jwtPayloadDto;

    const updateUserDto: UpdateUserDto = {
      getOneEntityDto: { id },
      updateEntityPayload: updateUserPayloadDto,
    };

    const res = await this.userRepository.updateEntity(updateUserDto);

    return res;
  }
}
