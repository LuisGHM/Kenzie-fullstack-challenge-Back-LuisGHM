import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JWTGuard } from '../auth/jwt.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JWTGuard)
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JWTGuard)
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
