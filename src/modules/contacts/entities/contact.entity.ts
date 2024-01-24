import { Transform } from "class-transformer";
import { randomUUID } from "crypto";

export class Contact {
    readonly id: string;
    name: string;
    email: string;
    telephone: string;

    @Transform(({ value }) => value.toISOString().split('T')[0])
    readonly created_at: Date;

    clientId: string;

    constructor() {
        this.id = randomUUID();
        this.created_at = new Date();
    }
}
