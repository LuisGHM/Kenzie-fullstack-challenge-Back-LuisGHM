import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService){}
  private clients: Client[] = [];

  async create(createClientDto: CreateClientDto) {
    const findUser = await this.prisma.client.findFirst({where: {email: createClientDto.email, telephone: createClientDto.telephone}});
    if(findUser){
      throw new ConflictException("User alredy exists");
    }
    const client = new Client();
    Object.assign(client, {...createClientDto,});
    await this.prisma.client.create({data: {...client}})
    return plainToInstance(Client, client)
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
