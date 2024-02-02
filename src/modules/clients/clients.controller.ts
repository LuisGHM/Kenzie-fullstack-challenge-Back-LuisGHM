import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JWTGuard } from '../auth/jwt.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @UseGuards(JWTGuard)
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @UseGuards(JWTGuard)
  findOne(@Param('id') id: string) { 
    return this.clientsService.findOne(id);
  }

  @Get('email/:email')
  @UseGuards(JWTGuard)
  findByEmail(@Param('email') email: string) { 
    return this.clientsService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(JWTGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JWTGuard)
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
