import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1553537096616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "session" ("id" varchar PRIMARY KEY NOT NULL, "eventId" varchar NOT NULL, "code" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "studentId" varchar NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "rating" integer NOT NULL, "sessionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_rating" ("id" varchar PRIMARY KEY NOT NULL, "studentId" varchar NOT NULL, "questionId" varchar, CONSTRAINT "FK_7c5e12c1f0bd305ae633f64fc56" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_rating"("id", "studentId", "questionId") SELECT "id", "studentId", "questionId" FROM "rating"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`ALTER TABLE "temporary_rating" RENAME TO "rating"`);
        await queryRunner.query(`CREATE TABLE "temporary_question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "rating" integer NOT NULL, "sessionId" varchar, CONSTRAINT "FK_b36af568dd6be0a5263faa1bdc3" FOREIGN KEY ("sessionId") REFERENCES "session" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_question"("id", "description", "rating", "sessionId") SELECT "id", "description", "rating", "sessionId" FROM "question"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`ALTER TABLE "temporary_question" RENAME TO "question"`);
        await queryRunner.query(`CREATE TABLE "temporary_answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "questionId" varchar, CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_answer"("id", "description", "questionId") SELECT "id", "description", "questionId" FROM "answer"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`ALTER TABLE "temporary_answer" RENAME TO "answer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "answer" RENAME TO "temporary_answer"`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`INSERT INTO "answer"("id", "description", "questionId") SELECT "id", "description", "questionId" FROM "temporary_answer"`);
        await queryRunner.query(`DROP TABLE "temporary_answer"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME TO "temporary_question"`);
        await queryRunner.query(`CREATE TABLE "question" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "rating" integer NOT NULL, "sessionId" varchar)`);
        await queryRunner.query(`INSERT INTO "question"("id", "description", "rating", "sessionId") SELECT "id", "description", "rating", "sessionId" FROM "temporary_question"`);
        await queryRunner.query(`DROP TABLE "temporary_question"`);
        await queryRunner.query(`ALTER TABLE "rating" RENAME TO "temporary_rating"`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "studentId" varchar NOT NULL, "questionId" varchar)`);
        await queryRunner.query(`INSERT INTO "rating"("id", "studentId", "questionId") SELECT "id", "studentId", "questionId" FROM "temporary_rating"`);
        await queryRunner.query(`DROP TABLE "temporary_rating"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
