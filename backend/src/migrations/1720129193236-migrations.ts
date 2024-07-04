import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1625452651510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "blog_post" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "content" TEXT NOT NULL
      );
      
      CREATE TABLE "comment" (
        "id" SERIAL PRIMARY KEY,
        "author" VARCHAR NOT NULL,
        "content" TEXT NOT NULL,
        "blogPostId" INTEGER
      );

      ALTER TABLE "comment"
      ADD CONSTRAINT "FK_comment_blogPostId" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "comment";
      DROP TABLE "blog_post";
    `);
  }
}
