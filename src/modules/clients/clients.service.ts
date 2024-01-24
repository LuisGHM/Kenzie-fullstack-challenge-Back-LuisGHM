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

    if(findClient.email == createClientDto.email){
      throw new ConflictException("A client with this email alredy exists");
    } if (findClient.telephone == createClientDto.telephone) {
      throw new ConflictException("A client with this telephone alredy exists");
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

  async findOne(id: string) {
    const client = await this.prisma.client.findFirst({where: {id: id}, include: {contacts: true}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    return plainToInstance(Client, client)
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({where: {id}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    const findClient = await this.prisma.client.findFirst({where: {email: updateClientDto.email, telephone: updateClientDto.telephone}});
    if(findClient.email == updateClientDto.email){
      throw new ConflictException("A client with this email alredy exists");
    } if (findClient.telephone == updateClientDto.telephone) {
      throw new ConflictException("A client with this telephone alredy exists");
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
