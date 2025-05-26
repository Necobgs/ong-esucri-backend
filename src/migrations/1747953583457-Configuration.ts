import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateConfigurationDto } from 'src/configuration/dto/create-configuration.dto';
import { module_name, type } from '../configuration/configuration.enum';

export class Configuration1747953583457 implements MigrationInterface {
  private values: CreateConfigurationDto[] = [
    {
      key: 'whatsapp_number',
      name: 'Número do WhatsApp',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.SOCIAL
    },
    {
      key: 'instagram_url',
      name: 'Link do Instagram',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.SOCIAL
    },
    {
      key: 'pix_key',
      name: 'Chave PIX',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.TRANSACTION
    },
    {
      key: 'email_host',
      name: 'Host do email',
      value: 'smtp.gmail.com',
      type: type.VARCHAR,
      module_name:module_name.EMAIL
    },
    {
      key: 'email_adress_sender',
      name: 'Endereço do email utilizado para os envios',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.EMAIL
    },
    {
      key: 'email_adress_receiver',
      name: 'Endereço do email utilizado receber os emails(pode ser o mesmo que envia)',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.EMAIL
    },
    {
      key: 'email_passw',
      name: 'Senha do endereço de email',
      value: '',
      type: type.VARCHAR,
      module_name:module_name.EMAIL
    },
    {
      key: 'email_subject_contact',
      name: 'Assunto do e-mail(agradecimento de contato)',
      value: 'Agradeçemos pelo contato',
      type: type.HTML,
      module_name:module_name.EMAIL
    },
    {
      key: 'email_template_contact',
      name: 'Corpo do e-mail (agradecimento de contato)',
      value: '<sectin><h1>Agradeçemos pela contribuição!<h1><p>Obrigado pelo contato, chamaremos para fornecer mais informações</p></sectin>',
      type: type.HTML,
      module_name:module_name.EMAIL
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        this.values.map((dto) =>
          queryRunner.query(
            `INSERT INTO configuration (id, key, name, value, type, module_name) VALUES ($1, $2, $3, $4, $5, $6)`,
            [randomUUID(), dto.key, dto.name, dto.value, dto.type,dto.module_name],
          ),
        ),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        this.values.map((dto) =>
          queryRunner.query(
            `DELETE FROM configuration WHERE key = $1 AND name = $2`,
            [dto.key, dto.name],
          ),
        ),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}