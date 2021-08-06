import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
    @PrimaryGeneratedColumn()
      id: number;

      @Column()
      name: string;

      @Column()
      qty: number;

      @Column()
      description: string;
}
