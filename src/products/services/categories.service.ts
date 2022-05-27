import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  // create(data: CreateCategoryDto) {
  //   this.counterId = this.counterId + 1;
  //   const newCategory = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }
  //
  // update(id: number, changes: UpdateCategoryDto) {
  //   const category = this.findOne(id);
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   this.categories[index] = {
  //     ...category,
  //     ...changes,
  //   };
  //   return this.categories[index];
  // }
  //
  // remove(id: number) {
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Category #${id} not found`);
  //   }
  //   this.categories.splice(index, 1);
  //   return true;
  // }
}
