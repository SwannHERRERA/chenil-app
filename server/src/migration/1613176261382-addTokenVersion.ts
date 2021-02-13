import {MigrationInterface, QueryRunner} from "typeorm";

export class addTokenVersion1613176261382 implements MigrationInterface {
    name = 'addTokenVersion1613176261382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "tokenVersion" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tokenVersion"`);
    }

}
