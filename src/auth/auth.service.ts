import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private readonly jwtService: JwtService
    ){
    }

    async login(dto:AuthLoginDto){
        const user = await this.validateUser(dto);
        const payload = { sub:user.id, email:user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(dto:AuthLoginDto){
        const user = await this.userService.findByEmail(dto.email);
        if(user && await bcrypt.compare(dto.password,user.password)){
            const {password, ...result}= user
            return result;
        }
        throw new UnauthorizedException()
  }

  async verifyToken(token: string) {
    try {
      // Verifica e decodifica o token
      const payload = this.jwtService.verify(token);
      // Busca o usuário associado ao payload
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      // Retorna os dados do usuário (excluindo informações sensíveis)
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

}