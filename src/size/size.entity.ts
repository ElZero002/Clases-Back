import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from "../products/entity/products.entity";


@Entity('size')
export class SizeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 10 })
    size: string;

    @ManyToMany(() => ProductEntity, (product) => product.sizes)
    products: ProductEntity[];
}
