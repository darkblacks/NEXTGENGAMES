import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ConsoleEntity } from './console/console.entity';
import { Game } from './game/game.entity';
import { PrecoProduto } from './preco/preco-produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto, ConsoleEntity, Game, PrecoProduto]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [TypeOrmModule, ProdutoService],
})
export class ProdutoModule {}