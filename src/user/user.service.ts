import { Injectable } from '@nestjs/common';
import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserById(
    getUserByIdDto: GetEntityByIdDto,
  ): Promise<[Error, UserDto]> {
    try {
      const res = await this.userRepository.getOneEntity(getUserByIdDto);

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async getUsers(): Promise<[Error, UserDto[]]> {
    try {
      const res = await this.userRepository.getEntities();

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<[Error, UserDto]> {
    try {
      const res = await this.userRepository.createEntity(createUserDto);

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<[Error, UserDto]> {
    try {
      const res = await this.userRepository.updateEntity(updateUserDto);

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteUserById(
    getUserByIdDto: GetEntityByIdDto,
  ): Promise<[Error, UserDto]> {
    try {
      const res = await this.userRepository.deleteOneEntity(getUserByIdDto);

      return res;
    } catch (error) {
      return [error, null];
    }
  }
}
