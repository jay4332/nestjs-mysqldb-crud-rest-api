import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';

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

  @ManyToOne(() => User, (user: User) => user.items)
  user: User;
  
  @RelationId((item: ItemEntity) => item.user)
  authorId: number;
}
