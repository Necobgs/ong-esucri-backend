import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateConfigurationDto } from 'src/configuration/dto/create-configuration.dto';

export class Configuration1747953583457 implements MigrationInterface {
  private values: CreateConfigurationDto[] = [
    {
      key: 'whatsapp_number',
      name: 'Número do WhatsApp',
      value: '',
      type: 'varchar',
    },
    {
      key: 'instagram_url',
      name: 'Link do Instagram',
      value: '',
      type: 'varchar',
    },
    {
      key: 'pix_key',
      name: 'Chave PIX',
      value: '',
      type: 'varchar',
    },
    {
      key: 'email_template_admin',
      name: 'Corpo do e-mail (recebido pela ONG)',
      value: '<sectin><h1>Novo contribuinte!<h1><p>Nome do contribuinte: {{nome}}<br>Data da mensagem: {{data-mensagem}}<br>Mensagem: {{mensagem}}</p></sectin>',
      type: 'html',
    },
    {
      key: 'email_template_contact',
      name: 'Corpo do e-mail (agradecimento de contato)',
      value: '<sectin><h1>Agradeçemos pela contribuição!<h1><p>Obrigado pelo contato, chamaremos para fornecer mais informações</p></sectin>',
      type: 'html',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        this.values.map((dto) =>
          queryRunner.query(
            `INSERT INTO configuration (id, key, name, value, type) VALUES ($1, $2, $3, $4, $5)`,
            [randomUUID(), dto.key, dto.name, dto.value, dto.type],
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