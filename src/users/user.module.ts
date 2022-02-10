import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.model';
import { MailModule } from "src/mail/mail.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name:'User', schema: UserSchema }]),
        MailModule
      ],
    controllers: [],
    providers: [UserService],
    exports: [UserService],

})


export class UserModule {}

