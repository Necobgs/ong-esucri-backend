import { PartialType } from '@nestjs/swagger';
import { CreateConfigurationDto } from './create-configuration.dto';
import { IsString } from 'class-validator';

export class UpdateConfigurationDto extends PartialType(CreateConfigurationDto) {

    @IsString()
    id:string;

    @IsString()
    created_at:Date;
    
    @IsString()
    updated_at:Date;

}