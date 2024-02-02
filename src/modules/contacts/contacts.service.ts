import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}

  async create(createContactDto: CreateContactDto, id: string) {
    const findClient = await this.prisma.client.findFirst({ where: { id: id }});
    const findContactWithEmail  = await this.prisma.client.findFirst({ where: { id: id }, include: {contacts: {where: {email: createContactDto.email}}} });
    const findContactWithTelephone = await this.prisma.client.findFirst({ where: { id: id }, include: {contacts: {where: {telephone: createContactDto.telephone}}} });

    if (findContactWithEmail.contacts.length > 0 ) {
      throw new ConflictException("A contact with this email already exists in you contact list");
    }
    if (findContactWithTelephone.contacts.length > 0 ) {
      throw new ConflictException("A contact with this telephone already exists in you contact list");
    }
  
    const contact = new Contact(findClient);
    Object.assign(contact, { ...createContactDto });
    await this.prisma.contact.create({ data: { ...contact } });
  
    return plainToInstance(Contact, contact);
  }
  

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException("Contact not found");
    }
  
    if (updateContactDto.email !== contact.email) {
      const findContactByEmail = await this.prisma.contact.findFirst({ where: { email: updateContactDto.email } });
      if (findContactByEmail) {
        throw new ConflictException("A contact with this email already exists");
      }
    }

    if (updateContactDto.telephone !== contact.telephone) {
      const findContactByTelephone = await this.prisma.contact.findFirst({ where: { telephone: updateContactDto.telephone } });
      if (findContactByTelephone) {
        throw new ConflictException("A contact with this telephone already exists");
      }
    }
  
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
  
    return plainToInstance(Contact, updatedContact);
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({where: {id}});
    if (!contact){
      throw new NotFoundException("Contact not found");
    }
    await this.prisma.contact.delete({where: {id}});
  }
}
