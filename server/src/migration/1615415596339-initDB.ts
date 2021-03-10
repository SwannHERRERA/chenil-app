import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1615415596339 implements MigrationInterface {
    name = 'initDB1615415596339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_type" ("typeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_63c74bc82b018bf892f1d191525" PRIMARY KEY ("typeId"))`);
        await queryRunner.query(`CREATE TABLE "insult" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "trigger" character varying NOT NULL, CONSTRAINT "PK_60e06161c70e8c84a6c91c99c7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("UserId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "inGamePseudo" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "idDiscord" character varying, "tokenVersion" integer NOT NULL, "pansuns" integer NOT NULL, CONSTRAINT "PK_825656fb054dbb121350ba0d9da" PRIMARY KEY ("UserId"))`);
        await queryRunner.query(`CREATE TABLE "alias" ("AliasId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_804fd1e5c5dc0cbaa0a9ead8b46" PRIMARY KEY ("AliasId"))`);
        await queryRunner.query(`CREATE TABLE "clan" ("clanId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bannerImage" character varying NOT NULL, "pansunsFund" integer NOT NULL, CONSTRAINT "PK_44f47996b2a5199c030423a4156" PRIMARY KEY ("clanId"))`);
        await queryRunner.query(`CREATE TABLE "move_synergie" ("moveSynergieId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_dbe6245103da9dcd653ffa9cbd4" PRIMARY KEY ("moveSynergieId"))`);
        await queryRunner.query(`CREATE TABLE "evolution_line" ("evolutionLineId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_01b23737ea962e3ef009729b7e3" PRIMARY KEY ("evolutionLineId"))`);
        await queryRunner.query(`CREATE TABLE "trait" ("traitId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f8bce007639872c53c814de5896" PRIMARY KEY ("traitId"))`);
        await queryRunner.query(`CREATE TABLE "temtem_have_trait" ("temtemHaveTraitId" uuid NOT NULL DEFAULT uuid_generate_v4(), "temtemTeitemId" uuid, "traitTraitId" uuid, CONSTRAINT "PK_5aa53b6e2a428bfde0b5b6330a3" PRIMARY KEY ("temtemHaveTraitId"))`);
        await queryRunner.query(`CREATE TABLE "temtem_image" ("temtemImageId" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "name" character varying NOT NULL, "useCase" integer NOT NULL, "temtemTeitemId" uuid, CONSTRAINT "PK_6c2a22b308619267930c0aa2674" PRIMARY KEY ("temtemImageId"))`);
        await queryRunner.query(`CREATE TABLE "location" ("locationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying NOT NULL, "trigger" character varying, "isReserved" boolean NOT NULL, CONSTRAINT "PK_8b51e14a3447c3df460c1907acb" PRIMARY KEY ("locationId"))`);
        await queryRunner.query(`CREATE TABLE "temtem_location_possibility" ("temtemLocationPossibilityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, "locationLocationId" uuid, "temtemTeitemId" uuid, CONSTRAINT "PK_4f0e6c137be0dd34d4df4f6c4be" PRIMARY KEY ("temtemLocationPossibilityId"))`);
        await queryRunner.query(`CREATE TABLE "temtem" ("teitemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "inGameId" integer NOT NULL, "publishDate" TIMESTAMP, "catchRate" integer, "tvYield" character varying, "maleRate" integer NOT NULL, "femaleRate" integer NOT NULL, "hp" integer NOT NULL, "sta" integer NOT NULL, "speed" integer NOT NULL, "atk" integer NOT NULL, "def" integer NOT NULL, "speatk" integer NOT NULL, "spedef" integer NOT NULL, "evolutionLineEvolutionLineId" uuid, "firstTypeTypeId" uuid, "secondTypeTypeId" uuid, CONSTRAINT "PK_6884d56fdd013fdc9a497f38d33" PRIMARY KEY ("teitemId"))`);
        await queryRunner.query(`CREATE TABLE "type" ("typeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "moveWithSynergieTypeMoveId" uuid, "movesMoveId" uuid, "temtemFirstTypeTeitemId" uuid, "temtemSecondTypeTeitemId" uuid, CONSTRAINT "PK_3a25b3b7490c51932eb4d7b6491" PRIMARY KEY ("typeId"))`);
        await queryRunner.query(`CREATE TABLE "move" ("moveId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "haveSynergie" boolean NOT NULL, "damage" integer NOT NULL, "stamina" integer NOT NULL, "hold" integer NOT NULL, "priority" real NOT NULL, "class" integer NOT NULL, "Target" integer NOT NULL, "effectsMoveEffectId" uuid, CONSTRAINT "PK_9cf37e1209d3e3c05dc55dccbc4" PRIMARY KEY ("moveId"))`);
        await queryRunner.query(`CREATE TABLE "move_effect" ("MoveEffectId" uuid NOT NULL DEFAULT uuid_generate_v4(), "intencity" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_00fb87f7e1c4d798a0e7b599797" PRIMARY KEY ("MoveEffectId"))`);
        await queryRunner.query(`CREATE TABLE "effect" ("effectId" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a8f2f6b404d808d8bf4b70e4cbe" PRIMARY KEY ("effectId"))`);
        await queryRunner.query(`CREATE TABLE "type_effect" ("TypeEffectId" uuid NOT NULL DEFAULT uuid_generate_v4(), "coefficient" integer NOT NULL, CONSTRAINT "PK_c91ec832c7ff9f9c8f3b95be281" PRIMARY KEY ("TypeEffectId"))`);
        await queryRunner.query(`ALTER TABLE "temtem_have_trait" ADD CONSTRAINT "FK_c424fe8dc1c4692f612c51f4545" FOREIGN KEY ("temtemTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_have_trait" ADD CONSTRAINT "FK_cc7a32b2f5c76c9137bebe623b8" FOREIGN KEY ("traitTraitId") REFERENCES "trait"("traitId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_image" ADD CONSTRAINT "FK_b141f853314d276fd5d87486c08" FOREIGN KEY ("temtemTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_location_possibility" ADD CONSTRAINT "FK_dfa9ffd84c1d9914dd695f4b2bb" FOREIGN KEY ("locationLocationId") REFERENCES "location"("locationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem_location_possibility" ADD CONSTRAINT "FK_0c7d70192b8ebbf15160d13f913" FOREIGN KEY ("temtemTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem" ADD CONSTRAINT "FK_76c23c448056b47d94dd03094fa" FOREIGN KEY ("evolutionLineEvolutionLineId") REFERENCES "evolution_line"("evolutionLineId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem" ADD CONSTRAINT "FK_7613318defb291a0dbe376bffd9" FOREIGN KEY ("firstTypeTypeId") REFERENCES "type"("typeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "temtem" ADD CONSTRAINT "FK_e1b63f9d3c07cdb8edbba4de3de" FOREIGN KEY ("secondTypeTypeId") REFERENCES "type"("typeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_21aaaf85c32f6c9c01ab5b20b2a" FOREIGN KEY ("moveWithSynergieTypeMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_8bd299711e2e1f777f24d2ef754" FOREIGN KEY ("movesMoveId") REFERENCES "move"("moveId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_b9da205837881bed617ea766711" FOREIGN KEY ("temtemFirstTypeTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type" ADD CONSTRAINT "FK_a5758de7638fd62a6965117e90e" FOREIGN KEY ("temtemSecondTypeTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_7aef3c4d18a0379d3b20f8117a9" FOREIGN KEY ("effectsMoveEffectId") REFERENCES "move_effect"("MoveEffectId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_7aef3c4d18a0379d3b20f8117a9"`);
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_a5758de7638fd62a6965117e90e"`);
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_b9da205837881bed617ea766711"`);
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_8bd299711e2e1f777f24d2ef754"`);
        await queryRunner.query(`ALTER TABLE "type" DROP CONSTRAINT "FK_21aaaf85c32f6c9c01ab5b20b2a"`);
        await queryRunner.query(`ALTER TABLE "temtem" DROP CONSTRAINT "FK_e1b63f9d3c07cdb8edbba4de3de"`);
        await queryRunner.query(`ALTER TABLE "temtem" DROP CONSTRAINT "FK_7613318defb291a0dbe376bffd9"`);
        await queryRunner.query(`ALTER TABLE "temtem" DROP CONSTRAINT "FK_76c23c448056b47d94dd03094fa"`);
        await queryRunner.query(`ALTER TABLE "temtem_location_possibility" DROP CONSTRAINT "FK_0c7d70192b8ebbf15160d13f913"`);
        await queryRunner.query(`ALTER TABLE "temtem_location_possibility" DROP CONSTRAINT "FK_dfa9ffd84c1d9914dd695f4b2bb"`);
        await queryRunner.query(`ALTER TABLE "temtem_image" DROP CONSTRAINT "FK_b141f853314d276fd5d87486c08"`);
        await queryRunner.query(`ALTER TABLE "temtem_have_trait" DROP CONSTRAINT "FK_cc7a32b2f5c76c9137bebe623b8"`);
        await queryRunner.query(`ALTER TABLE "temtem_have_trait" DROP CONSTRAINT "FK_c424fe8dc1c4692f612c51f4545"`);
        await queryRunner.query(`DROP TABLE "type_effect"`);
        await queryRunner.query(`DROP TABLE "effect"`);
        await queryRunner.query(`DROP TABLE "move_effect"`);
        await queryRunner.query(`DROP TABLE "move"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "temtem"`);
        await queryRunner.query(`DROP TABLE "temtem_location_possibility"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "temtem_image"`);
        await queryRunner.query(`DROP TABLE "temtem_have_trait"`);
        await queryRunner.query(`DROP TABLE "trait"`);
        await queryRunner.query(`DROP TABLE "evolution_line"`);
        await queryRunner.query(`DROP TABLE "move_synergie"`);
        await queryRunner.query(`DROP TABLE "clan"`);
        await queryRunner.query(`DROP TABLE "alias"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "insult"`);
        await queryRunner.query(`DROP TABLE "user_type"`);
    }

}
