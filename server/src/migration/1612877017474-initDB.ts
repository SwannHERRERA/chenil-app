import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1612877017474 implements MigrationInterface {
    name = 'initDB1612877017474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insult" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "trigger" character varying NOT NULL, CONSTRAINT "PK_60e06161c70e8c84a6c91c99c7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "id_discord" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_b1848d04b41d10a5712fc2e673c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_insults_insult" ("userId" uuid NOT NULL, "insultId" uuid NOT NULL, CONSTRAINT "PK_2d74c0ac430ca38993ff61e0986" PRIMARY KEY ("userId", "insultId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87277d3471a2cdc16019e93023" ON "user_insults_insult" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d62b9042354f4c9bc482d82a76" ON "user_insults_insult" ("insultId") `);
        await queryRunner.query(`ALTER TABLE "alias" ADD CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_insults_insult" ADD CONSTRAINT "FK_87277d3471a2cdc16019e93023f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_insults_insult" ADD CONSTRAINT "FK_d62b9042354f4c9bc482d82a768" FOREIGN KEY ("insultId") REFERENCES "insult"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_insults_insult" DROP CONSTRAINT "FK_d62b9042354f4c9bc482d82a768"`);
        await queryRunner.query(`ALTER TABLE "user_insults_insult" DROP CONSTRAINT "FK_87277d3471a2cdc16019e93023f"`);
        await queryRunner.query(`ALTER TABLE "alias" DROP CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac"`);
        await queryRunner.query(`DROP INDEX "IDX_d62b9042354f4c9bc482d82a76"`);
        await queryRunner.query(`DROP INDEX "IDX_87277d3471a2cdc16019e93023"`);
        await queryRunner.query(`DROP TABLE "user_insults_insult"`);
        await queryRunner.query(`DROP TABLE "alias"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "insult"`);
    }

}
