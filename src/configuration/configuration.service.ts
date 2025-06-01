import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { module_name } from './configuration.enum';
import { FindAllConfiguration } from './dto/findAll-configuration.dto';

@Injectable()
export class ConfigurationService {

  constructor(
    @InjectRepository(Configuration) private readonly configurationRepository:Repository<Configuration>
  ){}

  async create(createConfigurationDto: CreateConfigurationDto) {
    const configExists = await this.configurationRepository.findOneBy({key:createConfigurationDto.key}) 
    if (configExists) throw new BadRequestException()
    const config = this.configurationRepository.create({
      ...createConfigurationDto,
      id:randomUUID()
    });
    return await this.configurationRepository.save(config);
  }

  async findAll(dto:FindAllConfiguration) {

    const skip = (dto.page - 1) * dto.limit;
    return await this.configurationRepository.find({
      skip: skip,
      take: dto.limit,
      where:{
        module_name: dto.module_name?? "*",
        key: dto.key?? "*",
      },
      order: {
        [dto.sortBy]: dto.order,
      }
    });
  }

  async findOneByKey(key: string) {
    return await this.configurationRepository.findOneBy({key});
  }

  async update(id: string, updateConfigurationDto: UpdateConfigurationDto) {
    const config = await this.configurationRepository.findOneByOrFail({id});
    const configUpdated = {
      ...config,
      ...updateConfigurationDto
    }
    return await this.configurationRepository.save(configUpdated);
  }

}
