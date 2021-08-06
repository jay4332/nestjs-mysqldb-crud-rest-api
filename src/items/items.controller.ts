import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDTO } from './item.dto';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

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
         const item = await this.itemsService.create(data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item created successfully',
          item
        };
      }

      @Get(':id')
      async readItem(@Param('id') id: number) {
        const data =  await this.itemsService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item fetched successfully',
          data,
        };
      }

      @Patch(':id')
      async uppdateItem(@Param('id') id: number, @Body() data: Partial<ItemDTO>) {
        await this.itemsService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Item updated successfully',
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
