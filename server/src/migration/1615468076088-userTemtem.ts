import {MigrationInterface, QueryRunner} from "typeorm";

export class userTemtem1615468076088 implements MigrationInterface {
    name = 'userTemtem1615468076088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_temtem" ("userTemtemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "rename" character varying, "card" character varying NOT NULL, "originalTamer" character varying, "lvl" integer NOT NULL, "luma" boolean NOT NULL DEFAULT false, "sexe" integer NOT NULL, "fetility" integer NOT NULL, "isEgg" boolean NOT NULL DEFAULT false, "svHp" integer NOT NULL, "svSta" integer NOT NULL, "svSpeed" integer NOT NULL, "svAtk" integer NOT NULL, "svDef" integer NOT NULL, "svSpeatk" integer NOT NULL, "svSpedef" integer NOT NULL, "tvHp" integer NOT NULL, "tvSta" integer NOT NULL, "tvSpeed" integer NOT NULL, "tvAtk" integer NOT NULL, "tvDef" integer NOT NULL, "tvSpeatk" integer NOT NULL, "tvSpedef" integer NOT NULL, "userUserId" uuid, "temtemTeitemId" uuid, "findInLocationId" uuid, "additionalTypeTypeId" uuid, CONSTRAINT "PK_f9932cfb36a85107286eebdf67f" PRIMARY KEY ("userTemtemId"))`);
        await queryRunner.query(`ALTER TABLE "user_temtem" ADD CONSTRAINT "FK_4c49f0a3384644e5ec95a3ea0bb" FOREIGN KEY ("userUserId") REFERENCES "user"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_temtem" ADD CONSTRAINT "FK_257b3b764ba281de8e563c4f599" FOREIGN KEY ("temtemTeitemId") REFERENCES "temtem"("teitemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_temtem" ADD CONSTRAINT "FK_e294180155ae1d54e2ca26ea818" FOREIGN KEY ("findInLocationId") REFERENCES "location"("locationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_temtem" ADD CONSTRAINT "FK_1840f7fab2f64cf67240c07c700" FOREIGN KEY ("additionalTypeTypeId") REFERENCES "type"("typeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_temtem" DROP CONSTRAINT "FK_1840f7fab2f64cf67240c07c700"`);
        await queryRunner.query(`ALTER TABLE "user_temtem" DROP CONSTRAINT "FK_e294180155ae1d54e2ca26ea818"`);
        await queryRunner.query(`ALTER TABLE "user_temtem" DROP CONSTRAINT "FK_257b3b764ba281de8e563c4f599"`);
        await queryRunner.query(`ALTER TABLE "user_temtem" DROP CONSTRAINT "FK_4c49f0a3384644e5ec95a3ea0bb"`);
        await queryRunner.query(`DROP TABLE "user_temtem"`);
    }

}
