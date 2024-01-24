import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private clietService: ClientsService, private jwtService: JwtService){}

    async login({email, password}: LoginDto){
        const findUser = await this.clietService.findByEmail(email);
        if (!findUser) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const passwordCompared = await compare(password, findUser.password);
        if (!passwordCompared) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return {
            token: this.jwtService.sign({email},{subject: findUser.id})
        }
    }
}
