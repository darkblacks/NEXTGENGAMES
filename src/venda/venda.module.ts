import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './venda.entity';
import { ItemVenda } from './item-venda.entity';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, ItemVenda])],
  controllers: [VendaController],
  providers: [VendaService],
  exports: [TypeOrmModule, VendaService],
})
export class VendaModule {}