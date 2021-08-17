import { ItemEntity } from 'src/items/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @OneToMany(() => ItemEntity, (items: ItemEntity) => items.user)
    items?: ItemEntity[];
}
