import {MigrationInterface, QueryRunner} from "typeorm";

export class userLinks1615418801658 implements MigrationInterface {
    name = 'userLinks1615418801658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_have_type" ("userHaveTypeId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8d78376e79052d974ab97c88fad" PRIMARY KEY ("userHaveTypeId"))`);
        await queryRunner.query(`CREATE TABLE "insult_is_special_for" ("insultIsSpecialForId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_71a79192208d05cb6c0c5b94059" PRIMARY KEY ("insultIsSpecialForId"))`);
        await queryRunner.query(`ALTER TABLE "user_type" ADD "usersUserHaveTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "insult" ADD "usersInsultIsSpecialForId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_type" ADD CONSTRAINT "FK_6b5be5fda7cf88b84eb3536b4a7" FOREIGN KEY ("usersUserHaveTypeId") REFERENCES "user_have_type"("userHaveTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "insult" ADD CONSTRAINT "FK_cbbab056e95284ba5e785b23563" FOREIGN KEY ("usersInsultIsSpecialForId") REFERENCES "insult_is_special_for"("insultIsSpecialForId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insult" DROP CONSTRAINT "FK_cbbab056e95284ba5e785b23563"`);
        await queryRunner.query(`ALTER TABLE "user_type" DROP CONSTRAINT "FK_6b5be5fda7cf88b84eb3536b4a7"`);
        await queryRunner.query(`ALTER TABLE "insult" DROP COLUMN "usersInsultIsSpecialForId"`);
        await queryRunner.query(`ALTER TABLE "user_type" DROP COLUMN "usersUserHaveTypeId"`);
        await queryRunner.query(`DROP TABLE "insult_is_special_for"`);
        await queryRunner.query(`DROP TABLE "user_have_type"`);
    }

}
