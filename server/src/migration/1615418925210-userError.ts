import {MigrationInterface, QueryRunner} from "typeorm";

export class userError1615418925210 implements MigrationInterface {
    name = 'userError1615418925210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "typesUserHaveTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "insultsInsultIsSpecialForId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5eeb8b712f16af439a26c477221" FOREIGN KEY ("typesUserHaveTypeId") REFERENCES "user_have_type"("userHaveTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0fb6a034611fe4683c4bc13d594" FOREIGN KEY ("insultsInsultIsSpecialForId") REFERENCES "insult_is_special_for"("insultIsSpecialForId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0fb6a034611fe4683c4bc13d594"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5eeb8b712f16af439a26c477221"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "insultsInsultIsSpecialForId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "typesUserHaveTypeId"`);
    }

}
