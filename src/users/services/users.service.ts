import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // create(data: CreateUserDto) {
  //   this.counterId = this.counterId + 1;
  //   const newUser = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }
  //
  // update(id: number, changes: UpdateUserDto) {
  //   const user = this.findOne(id);
  //   const index = this.users.findIndex((item) => item.id === id);
  //   this.users[index] = {
  //     ...user,
  //     ...changes,
  //   };
  //   return this.users[index];
  // }
  //
  // remove(id: number) {
  //   const index = this.users.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   this.users.splice(index, 1);
  //   return true;
  // }

  async getOrderByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
