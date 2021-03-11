import {MigrationInterface, QueryRunner} from "typeorm";

export class moveTemtem1615451124706 implements MigrationInterface {
    name = 'moveTemtem1615451124706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e5fdde8344327c08e9b7105bc02"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_27ac815230706977a18575654f3"`);
        await queryRunner.query(`CREATE TABLE "egg_move_giver" ("eggMoveGiverId" uuid NOT NULL DEFAULT uuid_generate_v4(), "temtemGiverTeitemId" uuid, "moveMoveId" uuid, "temtemReciverTemtemHaveMove" uuid, CONSTRAINT "PK_49c9a19f5f564ed21ac8361e8a7" PRIMARY KEY ("eggMoveGiverId"))`);
        await queryRunner.query(`CREATE TABLE "temtem_have_move" ("temtemHaveMove" uuid NOT NULL DEFAULT uuid_generate_v4(), "method" integer NOT NULL, "temtemTeitemId" uuid, "moveMoveId" uuid, CONSTRAINT "PK_1ccdc61620671e73a5cd43982a0" PRIMARY KEY ("temtemHaveMove"))`);
        await queryRunner.query(`ALTER TABLE "move" DROP COLUMN "synergieMoveSynergieId"`);
        await queryRunner.query(`ALTER TABLE "move" DROP COLUMN "parentMoveMoveSynergieId"`);
        await queryRunner.query(`ALTER TABLE "move_synergie" ADD "moveMoveId" uuid`);
        await queryRunner.query(`ALTER TABLE "move_synergie" ADD "moveSynergieMoveId" uuid`);
        await queryRunner.query(`ALTER TABLE "move_synergie" ADD CONSTRAINT "FK_b1ac8fe451256166fb2863059b1" FOREIGN KEY ("moveMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move_synergie" ADD CONSTRAINT "FK_71529d7525c112fcc5641e11bbb" FOREIGN KEY ("moveSynergieMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" ADD CONSTRAINT "FK_844b2be3984a742d4da40e19c5d" FOREIGN KEY ("temtemGiverTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" ADD CONSTRAINT "FK_557297aad66d8e3a59f943b74b9" FOREIGN KEY ("moveMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" ADD CONSTRAINT "FK_fc7dd5793c5c6e59aa307fc7a82" FOREIGN KEY ("temtemReciverTemtemHaveMove") REFERENCES "temtem_have_move"("temtemHaveMove") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_have_move" ADD CONSTRAINT "FK_902a7af2f94a3b2b52b208fdfc9" FOREIGN KEY ("temtemTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_have_move" ADD CONSTRAINT "FK_e4c59719ea4428c30ac98995674" FOREIGN KEY ("moveMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temtem_have_move" DROP CONSTRAINT "FK_e4c59719ea4428c30ac98995674"`);
        await queryRunner.query(`ALTER TABLE "temtem_have_move" DROP CONSTRAINT "FK_902a7af2f94a3b2b52b208fdfc9"`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" DROP CONSTRAINT "FK_fc7dd5793c5c6e59aa307fc7a82"`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" DROP CONSTRAINT "FK_557297aad66d8e3a59f943b74b9"`);
        await queryRunner.query(`ALTER TABLE "egg_move_giver" DROP CONSTRAINT "FK_844b2be3984a742d4da40e19c5d"`);
        await queryRunner.query(`ALTER TABLE "move_synergie" DROP CONSTRAINT "FK_71529d7525c112fcc5641e11bbb"`);
        await queryRunner.query(`ALTER TABLE "move_synergie" DROP CONSTRAINT "FK_b1ac8fe451256166fb2863059b1"`);
        await queryRunner.query(`ALTER TABLE "move_synergie" DROP COLUMN "moveSynergieMoveId"`);
        await queryRunner.query(`ALTER TABLE "move_synergie" DROP COLUMN "moveMoveId"`);
        await queryRunner.query(`ALTER TABLE "move" ADD "parentMoveMoveSynergieId" uuid`);
        await queryRunner.query(`ALTER TABLE "move" ADD "synergieMoveSynergieId" uuid`);
        await queryRunner.query(`DROP TABLE "temtem_have_move"`);
        await queryRunner.query(`DROP TABLE "egg_move_giver"`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_27ac815230706977a18575654f3" FOREIGN KEY ("parentMoveMoveSynergieId") REFERENCES "move_synergie"("moveSynergieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e5fdde8344327c08e9b7105bc02" FOREIGN KEY ("synergieMoveSynergieId") REFERENCES "move_synergie"("moveSynergieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
