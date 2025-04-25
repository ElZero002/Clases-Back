import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/products/entity/products.entity'; // ✅ Cambio aquí

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 50 })
    name: string;
    
    @Column('varchar', { length: 50 })
    last_name: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @Column('date')
    birthday: Date;
    
    @Column('varchar', { length: 20 })
    identification: string;

    @OneToMany(() => ProductEntity, (product) => product.user) // ✅ Cambio aquí
    products: ProductEntity[]; // ✅ Cambio aquí
}
