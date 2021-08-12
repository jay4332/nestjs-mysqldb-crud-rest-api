import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemEntity } from './item.entity';
import { ItemDTO } from './item.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(ItemEntity) private itemsRepository: Repository<ItemEntity>,){}

    async showAll(): Promise<ItemEntity[]>  {
        return await this.itemsRepository.find({ relations: ['user']});
    }

    async create(data: ItemDTO, user: User) {
        const newUser = await this.itemsRepository.create({ ...data, user: user});
        await this.itemsRepository.save(newUser);
        return newUser;
    }

    async read(id: number) {
        return await this.itemsRepository.findOne(id, {relations: ['user']});
    }

    async update(id: number, data: ItemDTO) {
        await this.itemsRepository.update({ id }, data);
        return await this.itemsRepository.findOne(id, {relations: ['user']});
    }

    async destroy(id: number) {
        await this.itemsRepository.delete({ id });
        return { deleted: true };
    }
}
