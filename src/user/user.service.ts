import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(createUserDto.password,salt);
    const userExists = await this.userRepository.findOneBy({email:createUserDto.email});
    if(userExists) throw new HttpException('Email já está em uso',HttpStatus.BAD_REQUEST);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password:hashedPassword,
      id:randomUUID()
    });
    const createdUser = await this.userRepository.save(newUser);
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async findAll(paginationDTO:PaginationDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      order = 'ASC',
    } = paginationDTO;

    const skip = (page - 1) * limit
    return await this.userRepository.find({
      skip:skip,
      take:limit,
      order:{
        [sortBy]: order.toUpperCase()
      },
      select:['id','email','username','created_at','activated']
    },
    );
  }

  async findOne(id: string) {
    return this.userRepository.findBy({id});
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneByOrFail({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({id});
    const updatedUser = {
      ...user,
      ...updateUserDto,
      
    }
    const {password, ...updatedUserWithoutPassword} = await this.userRepository.save(updatedUser);
    return updatedUserWithoutPassword;
  }

  async validateUser(email:string,password:string){
    const user = await this.findByEmail(email);
    if(user && await bcrypt.compare(password,user.password)){
      return user;
    }
    throw new NotFoundException()
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneByOrFail({id});
    user.activated=false;
    await this.userRepository.save(user)
    return { message: 'Usuário deletado com sucesso' };
  }
}
