import { Controller,Get,Post,Patch,Delete,Body,Param,HttpStatus, Put} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDTO } from './item.dto';
import { UsersService } from 'src/users/users.service';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService, private usersService: UsersService) {}

      @Get()
      async showAllItems() {
        const items =  await this.itemsService.showAll();
        return {
          statusCode: HttpStatus.OK,
          message: 'Items fetched successfully',
          items
        };
      }

      @Post()
      async createItems(@Body() data: ItemDTO) {
        const user = await this.usersService.findOne(data.userId);
         const item = await this.itemsService.create(data, user);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item created successfully',
          item
        };
      }

      @Get(':id')
      async readItem(@Param('id') id: number) {
        const item =  await this.itemsService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item fetched successfully',
          item,
        };
      }

      @Put(':id')
      async uppdateItem(@Param('id') id: number, @Body() data: ItemDTO) {
        const item = await this.itemsService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item updated successfully',
          item
        };
      }

      @Delete(':id')
      async deleteItem(@Param('id') id: number) {
        await this.itemsService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item deleted successfully',
        };
      }
}
