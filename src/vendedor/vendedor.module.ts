import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './vendedor.entity';
import { VendedorController } from './vendedor.controller';
import { VendedorService } from './vendedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor])],
  controllers: [VendedorController],
  providers: [VendedorService],
  exports: [TypeOrmModule, VendedorService],
})
export class VendedorModule {}