import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [ClientsModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
