import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(email: string, age: number): Promise<User> {
    return this.usersRepository.create({
      userId: uuid(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ userId }, userUpdates);
  }
}
