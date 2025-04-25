import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from '../../user/users.entity'; // Ajusta el path según tu estructura
import { SizeEntity } from '../../size/size.entity'; // Asegúrate que este path es correcto

@Entity()
export class ProductEntity { // 👈 CAMBIADO de "Product" a "ProductEntity"
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @ManyToMany(() => SizeEntity, (size) => size.products)
  @JoinTable()
  sizes: SizeEntity[];
}

