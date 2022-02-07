import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot("mongodb+srv://harinder:harinder46@cluster0.gfjii.mongodb.net/productdatabase?retryWrites=true&w=majority"), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
