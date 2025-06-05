import { Injectable, NotFoundException } from '@nestjs/common';
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
            acess_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(dto:AuthLoginDto){
        const user = await this.userService.findByEmail(dto.email);
        if(user && await bcrypt.compare(dto.password,user.password)){
            const {password, ...result}= user
            return result;
        }
        throw new NotFoundException()
  }

}