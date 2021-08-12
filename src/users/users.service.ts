import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // return 'This action adds a new user';
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(createUserDto);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    // return `This action returns all users`;
    return await this.userRepository.find({relations: ['items']});
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    return await this.userRepository.findOne(id, {relations: ['items']});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    await this.userRepository.update( id , updateUserDto);
    return await this.userRepository.findOne(id, {relations: ['items']});
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    await this.userRepository.delete({ id });
    return { deleted: true };
  }
}
