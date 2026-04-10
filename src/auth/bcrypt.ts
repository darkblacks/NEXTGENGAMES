// src/auth/bcrypt.ts
import * as bcrypt from 'bcrypt';

export class Bcrypt {
  public static async criptografarSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  public static async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return bcrypt.compare(senhaDigitada, senhaBanco);
  }
}