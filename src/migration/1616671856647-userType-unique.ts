import {MigrationInterface, QueryRunner} from "typeorm";

export class userTypeUnique1616671856647 implements MigrationInterface {
    name = 'userTypeUnique1616671856647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user_type"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_type" ADD CONSTRAINT "UQ_f70648ef30041d66995a0394afc" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_type" DROP CONSTRAINT "UQ_f70648ef30041d66995a0394afc"`);
        await queryRunner.query(`COMMENT ON COLUMN "user_type"."name" IS NULL`);
    }

}
