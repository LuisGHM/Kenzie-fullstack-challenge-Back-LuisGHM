import { Exclude, Transform } from "class-transformer";
import { randomUUID } from "crypto";
import { Contact } from "src/modules/contacts/entities/contact.entity";
import { CreateClientDto } from "../dto/create-client.dto";

export class Client {
    readonly id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    telephone: string;

    @Transform(({ value }) => value.toISOString().split('T')[0])
    readonly created_at: Date;

    readonly contacts?: Contact[]; 

    constructor() {
        this.id = randomUUID();
        this.created_at = new Date();
    }
}
