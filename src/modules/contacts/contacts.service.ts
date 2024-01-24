import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}
  private contacts: Contact[] = [];

   async create(createContactDto: CreateContactDto) {
    const FindContact = await this.prisma.contact.findFirst({where: {email: createContactDto.email, telephone: createContactDto.telephone}})
    if (FindContact) {
      throw new ConflictException("Contact alredy exists");
    }
    const contact = new Contact();
    Object.assign(contact, {...createContactDto});
    await this.prisma.contact.create({data: {...contact}})
    return plainToInstance(Contact, contact)
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({where: {id}});
    if (!contact){
      throw new NotFoundException("Contact not found");
    }
    const updatedContact = await this.prisma.contact.update({
      where: {id},
      data: {...updateContactDto},
    });
    return plainToInstance(Contact, updateContactDto)
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({where: {id}});
    if (!contact){
      throw new NotFoundException("Contact not found");
    }
    await this.prisma.contact.delete({where: {id}});
  }
}
