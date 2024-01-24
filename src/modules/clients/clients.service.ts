import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService){}

  async create(createClientDto: CreateClientDto) {
    const findClient = await this.prisma.client.findFirst({where: {email: createClientDto.email, telephone: createClientDto.telephone}});
    console.log(findClient);
    
    if(findClient){
      throw new ConflictException("User alredy exists");
    }
    const client = new Client();
    Object.assign(client, {...createClientDto,});
    await this.prisma.client.create({data: {...client, contacts: undefined}})
    return plainToInstance(Client, client)
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({include: {contacts: true}});
    return plainToInstance(Client, clients)
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({where: {id}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    const updatedClient = await this.prisma.client.update({
      where: {id},
      data: {...updateClientDto},
    });
    return plainToInstance(Client, updateClientDto)
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({where: {id}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    await this.prisma.client.delete({where: {id}});
  }
}
