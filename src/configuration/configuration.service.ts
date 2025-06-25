import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(dto: FindAllConfiguration) {
    const { page = 1, limit = 10, module_name, key, sortBy = 'id', order = 'ASC' } = dto;

    // Lista de colunas permitidas para ordenação
    const allowedSortColumns = ['id', 'module_name', 'key', 'created_at'];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'id';

    // Construir condições do where dinamicamente
    const where: any = {};
    if (module_name) {
      where.module_name = module_name;
    }
    if (key) {
      where.key = key;
    }

    const skip = (page - 1) * limit;

    // Buscar registros e contar total
    const [items, total] = await this.configurationRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        [sortColumn]: order,
      },
    });

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOneByKey(key: string) {
    return await this.configurationRepository.findOneBy({key});
  }

  async update(updateConfigurationDto: UpdateConfigurationDto[]) {
    return await this.configurationRepository.manager.transaction(async (transactionalEntityManager) => {
      const updatedConfigs: Configuration[] = [];

      for (const dto of updateConfigurationDto) {
        // Buscar a configuração pelo ID usando o gerenciador transacional
        const config = await transactionalEntityManager.findOne(Configuration, {
          where: { id: dto.id },
        });

        if (!config) {
          return new NotFoundException(`Configuração com ID ${dto.id} não encontrada`);
        }

        // Mesclar os dados do DTO com a configuração existente
        const configUpdated = {
          ...config,
          ...dto,
          updated_at: new Date(), // Atualizar o timestamp
        };

        // Salvar a configuração atualizada usando o gerenciador transacional
        const newConfiguration = await transactionalEntityManager.save(Configuration, configUpdated);
        updatedConfigs.push(newConfiguration);
      }

      return updatedConfigs;
    });
  }

}
