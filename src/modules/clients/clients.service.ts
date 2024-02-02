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
    const findClientByEmail = await this.prisma.client.findFirst({ where: { email: createClientDto.email } });
    const findClientByTelephone = await this.prisma.client.findFirst({ where: { telephone: createClientDto.telephone } });
  
    if (findClientByEmail && findClientByTelephone) {
      throw new ConflictException("A client with this email and telephone already exists");
    } else if (findClientByEmail) {
      throw new ConflictException("A client with this email already exists");
    } else if (findClientByTelephone) {
      throw new ConflictException("A client with this telephone already exists");
    }
  
    const client = new Client();
    Object.assign(client, { ...createClientDto });
    await this.prisma.client.create({ data: { ...client, contacts: undefined } });
  
    return plainToInstance(Client, client);
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({include: {contacts: true}});
    return plainToInstance(Client, clients)
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({where: {id: id}, include: {contacts: true}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    return plainToInstance(Client, client)
  }

  async verifyEmail(email: string) {
    const client = await this.prisma.client.findFirst({where: {email: email}, include: {contacts: true}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    return client
  }

  async findByEmail(email: string) {
    const client = await this.prisma.client.findFirst({where: {email: email}, include: {contacts: true}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    return plainToInstance(Client, client)
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException("Client not found");
    }
  
    if (updateClientDto.email !== client.email) {
      const findClientByEmail = await this.prisma.client.findFirst({ where: { email: updateClientDto.email } });
      if (findClientByEmail) {
        throw new ConflictException("A client with this email already exists");
      }
    }
  
    if (updateClientDto.telephone !== client.telephone) {
      const findClientByTelephone = await this.prisma.client.findFirst({ where: { telephone: updateClientDto.telephone } });
      if (findClientByTelephone) {
        throw new ConflictException("A client with this telephone already exists");
      }
    }
  
    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: { ...updateClientDto },
    });
  
    return plainToInstance(Client, updatedClient);
  }
  

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({where: {id}});
    if (!client){
      throw new NotFoundException("Client not found");
    }
    await this.prisma.client.delete({where: {id}});
  }
}
