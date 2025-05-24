import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';

export class Configuration1747953583457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // Segundo registro: whatsapp_number
    await queryRunner.query(
      `INSERT INTO configuration (id, key, name, value) VALUES ($1, $2, $3, $4)`,
      [randomUUID(), 'whatsapp_number', 'Número do whatsapp', '']
    );

    // Terceiro registro: instagram_url
    await queryRunner.query(
      `INSERT INTO configuration (id, key, name, value) VALUES ($1, $2, $3, $4)`,
      [randomUUID(), 'instagram_url', 'Link do instagram', '']
    );

    // Quarto registro: pix_key
    await queryRunner.query(
      `INSERT INTO configuration (id, key, name, value) VALUES ($1, $2, $3, $4)`,
      [randomUUID(), 'pix_key', 'Chave pix', '']
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter os registros inseridos
    await queryRunner.query(
      `DELETE FROM configuration WHERE key = $1 AND name = $2 AND value = $3`,
      ['aaaa', 'bbbb', 'cccc']
    );
    await queryRunner.query(
      `DELETE FROM configuration WHERE key = $1 AND name = $2`,
      ['whatsapp_number', 'Número do whatsapp']
    );
    await queryRunner.query(
      `DELETE FROM configuration WHERE key = $1 AND name = $2`,
      ['instagram_url', 'Link do instagram']
    );
    await queryRunner.query(
      `DELETE FROM configuration WHERE key = $1 AND name = $2`,
      ['pix_key', 'Chave pix']
    );
  }
}