import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule],
  controllers: [AppController, PaymentsController],
  providers: [AppService],
})
export class AppModule {}