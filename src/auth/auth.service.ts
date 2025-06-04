import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService){
    }

    async login(dto:AuthLoginDto){
        const user = await this.validateUser(dto);
        return dto
    }

    async validateUser(dto:AuthLoginDto){
        const user = await this.userService.findByEmail(dto.email);
        if(user && await bcrypt.compare(dto.password,user.password)){
        return user;
        }
        throw new NotFoundException()
  }

}