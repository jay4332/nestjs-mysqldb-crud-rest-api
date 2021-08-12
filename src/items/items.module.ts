import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ItemEntity } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';


@Module({    
    imports: [TypeOrmModule.forFeature([ItemEntity]), UsersModule],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
