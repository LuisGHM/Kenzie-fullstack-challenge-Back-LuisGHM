import { Exclude } from "class-transformer";
import { randomUUID } from "crypto";

export class Client {
    readonly id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    telephone: string;
    readonly create_at: Date;

    constructor() {
        this.id = randomUUID();
        this.create_at = new Date(); 
    }
}
