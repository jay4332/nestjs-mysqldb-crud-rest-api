import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemEntity } from './item.entity';
import { ItemDTO } from './item.dto';

@Injectable()
export class ItemsService {
    constructor(
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
    ) {}

    async showAll() {
    return await this.itemsRepository.find();
    }

    async create(data: ItemDTO) {
    const user = this.itemsRepository.create(data);
    await this.itemsRepository.save(data);
    return user;
    }

    async findByEmail(email: string): Promise<ItemDTO> {
    return await this.itemsRepository.findOne({
        where: {
        email: email,
        },
    });
    }

    async read(id: number) {
    return await this.itemsRepository.findOne({ where: { id: id } });
    }

    async update(id: number, data: Partial<ItemDTO>) {
    await this.itemsRepository.update({ id }, data);
    return await this.itemsRepository.findOne({ id });
    }

    async destroy(id: number) {
    await this.itemsRepository.delete({ id });
    return { deleted: true };
    }
}
