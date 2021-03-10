import {MigrationInterface, QueryRunner} from "typeorm";

export class moveSynergie1615419626991 implements MigrationInterface {
    name = 'moveSynergie1615419626991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" ADD "synergieMoveSynergieId" uuid`);
        await queryRunner.query(`ALTER TABLE "move" ADD "parentMoveMoveSynergieId" uuid`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e5fdde8344327c08e9b7105bc02" FOREIGN KEY ("synergieMoveSynergieId") REFERENCES "move_synergie"("moveSynergieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_27ac815230706977a18575654f3" FOREIGN KEY ("parentMoveMoveSynergieId") REFERENCES "move_synergie"("moveSynergieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_27ac815230706977a18575654f3"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e5fdde8344327c08e9b7105bc02"`);
        await queryRunner.query(`ALTER TABLE "move" DROP COLUMN "parentMoveMoveSynergieId"`);
        await queryRunner.query(`ALTER TABLE "move" DROP COLUMN "synergieMoveSynergieId"`);
    }

}
