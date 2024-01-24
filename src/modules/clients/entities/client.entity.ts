import { Exclude, Transform } from "class-transformer";
import { randomUUID } from "crypto";

export class Client {
    readonly id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    telephone: string;

    @Transform(({ value }) => value.toISOString().split('T')[0])
    readonly created_at: Date;

    constructor() {
        this.id = randomUUID();
        this.created_at = new Date();
    }
}
