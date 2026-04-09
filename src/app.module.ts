import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CategoriaModule } from './categoria/categoria.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { ProdutoModule } from './produto/produto.module';
import { PrecoProdutoModule } from './produto/preco/preco-produto.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    CategoriaModule,
    VendedorModule,
    ProdutoModule,
    PrecoProdutoModule,
    VendaModule,
  ],
})
export class AppModule {}