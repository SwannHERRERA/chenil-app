import {MigrationInterface, QueryRunner} from "typeorm";

export class addSomeKeys1615417171979 implements MigrationInterface {
    name = 'addSomeKeys1615417171979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "aliasAliasId" uuid`);
        await queryRunner.query(`ALTER TABLE "type" ADD "fromTypeTypeEffectId" uuid`);
        await queryRunner.query(`ALTER TABLE "type" ADD "toTypesTypeEffectId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_3992d71cc4e3b6be2df4efde1fd" FOREIGN KEY ("aliasAliasId") REFERENCES "alias"("AliasId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_c0fc6d67fa30aaafef7da294c69" FOREIGN KEY ("fromTypeTypeEffectId") REFERENCES "type_effect"("TypeEffectId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_a1b0332382cf1e3b81eeeb605e9" FOREIGN KEY ("toTypesTypeEffectId") REFERENCES "type_effect"("TypeEffectId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_a1b0332382cf1e3b81eeeb605e9"`);
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_c0fc6d67fa30aaafef7da294c69"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_3992d71cc4e3b6be2df4efde1fd"`);
        await queryRunner.query(`ALTER TABLE "type" DROP COLUMN "toTypesTypeEffectId"`);
        await queryRunner.query(`ALTER TABLE "type" DROP COLUMN "fromTypeTypeEffectId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "aliasAliasId"`);
    }

}
