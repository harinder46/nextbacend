import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name:'User', schema: UserSchema }]),
      ],
    controllers: [],
    providers: [UserService],
    exports: [UserService],

})


export class UserModule {}

