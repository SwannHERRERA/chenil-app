"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB1612877017474 = void 0;
class initDB1612877017474 {
    constructor() {
        this.name = 'initDB1612877017474';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "insult" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "trigger" character varying NOT NULL, CONSTRAINT "PK_60e06161c70e8c84a6c91c99c7e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "id_discord" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "alias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_b1848d04b41d10a5712fc2e673c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user_insults_insult" ("userId" uuid NOT NULL, "insultId" uuid NOT NULL, CONSTRAINT "PK_2d74c0ac430ca38993ff61e0986" PRIMARY KEY ("userId", "insultId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_87277d3471a2cdc16019e93023" ON "user_insults_insult" ("userId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d62b9042354f4c9bc482d82a76" ON "user_insults_insult" ("insultId") `);
            yield queryRunner.query(`ALTER TABLE "alias" ADD CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_insults_insult" ADD CONSTRAINT "FK_87277d3471a2cdc16019e93023f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_insults_insult" ADD CONSTRAINT "FK_d62b9042354f4c9bc482d82a768" FOREIGN KEY ("insultId") REFERENCES "insult"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_insults_insult" DROP CONSTRAINT "FK_d62b9042354f4c9bc482d82a768"`);
            yield queryRunner.query(`ALTER TABLE "user_insults_insult" DROP CONSTRAINT "FK_87277d3471a2cdc16019e93023f"`);
            yield queryRunner.query(`ALTER TABLE "alias" DROP CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac"`);
            yield queryRunner.query(`DROP INDEX "IDX_d62b9042354f4c9bc482d82a76"`);
            yield queryRunner.query(`DROP INDEX "IDX_87277d3471a2cdc16019e93023"`);
            yield queryRunner.query(`DROP TABLE "user_insults_insult"`);
            yield queryRunner.query(`DROP TABLE "alias"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "insult"`);
        });
    }
}
exports.initDB1612877017474 = initDB1612877017474;
//# sourceMappingURL=1612877017474-initDB.js.map