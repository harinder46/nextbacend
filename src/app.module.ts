import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: '.env',
    }),
    ProductModule, 
    MongooseModule.forRoot("mongodb+srv://harinder:harinder46@cluster0.gfjii.mongodb.net/productdatabase?retryWrites=true&w=majority"), UserModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
