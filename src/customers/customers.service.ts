import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import {Customer} from './interface/customer.interface'
import { CustomersPatchDto } from './dto/customers-patch.dto';

@Injectable()
export class CustomersService {
    private customers : Customer[] = [
        {
            id: 0,
            name: 'Diego Yanez',
            age: 31,
            birthday: new Date('1999-02-06'),
            recidence: 'Colombia'
        },
        {
            id: 1,
            name: 'Alejandro Maldonado',
            age: 21,
            birthday: new Date('2003-05-15'),
            recidence: 'Ecuador'
        },
        {
            id: 2,
            name: 'Pablo Reyes',
            age: 23,
            birthday: new Date('1997-02-06'),
            recidence: 'Panama'
        },
    ]

    //READ DEL CRUD
    getCustomers(): Customer[] {
        return this.customers;
    }

    getCustomersById(id: number): Customer | undefined{
        return this.customers.find((item: Customer) => item.id == id);
    }

    //CREATE DEL CRUD

    insert(body: any) {
        this.customers = [
            ...this.customers,
            {
                id: this.lastId() + 1,
                name: body.name,
                age: body.age,
                birthday: body.birthday,
                recidence: body.recidence,
            }
        ];
    }

    private lastId(): number {
        return this.customers[this.customers.length - 1].id;
    }

    //UPDATE DEL CRUD

    update(id: number, body: any) {
        let customer: Customer = {
            id,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
            recidence: body.recidence
        }
        this.customers = this.customers.map( (item: Customer) => {
            console.log(item, id, item.id == id);
            return item.id == id? customer : item;
        }
        )
    }

   // PATCH DEL CRUD
patch(id: number, body: CustomersPatchDto) {
    let previusCustumer = this.getCustomersById(id);
    if (!previusCustumer) {
        return {
            error: 'Customer not found',
            statusCode: HttpStatus.NOT_FOUND,
        };
    }
    let customer: Customer = {
        ...previusCustumer,
        ...body, 
        id: previusCustumer.id,
    };
    this.customers = this.customers.map((item: Customer) => {
        return item.id == id ? customer : item;
    }); 
}


    //DELETE DENTRO DEL CRUD

    delete(id: number) {
        this.customers = this.customers.filter( (item: Customer) => item.id != id);
    }
}
