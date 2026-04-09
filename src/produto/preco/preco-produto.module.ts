import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrecoProduto } from './preco-produto.entity';
import { PrecoProdutoController } from './preco-produto.controller';
import { PrecoProdutoService } from './preco-produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrecoProduto])],
  controllers: [PrecoProdutoController],
  providers: [PrecoProdutoService],
  exports: [TypeOrmModule, PrecoProdutoService],
})
export class PrecoProdutoModule {}