import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitialSchema1625452651510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'username', type: 'varchar', isNullable: false },
          { name: 'password', type: 'varchar', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'blog_post',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'content', type: 'text', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'comment',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'author', type: 'varchar', isNullable: false },
          { name: 'content', type: 'text', isNullable: false },
          { name: 'blogPostId', type: 'integer' },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['blogPostId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'blog_post',
            onDelete: 'CASCADE',
          }),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'auth_tokens',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'token', type: 'varchar', isNullable: false },
          { name: 'userId', type: 'integer' },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_tokens', true);
    await queryRunner.dropTable('comment', true);
    await queryRunner.dropTable('blog_post', true);
    await queryRunner.dropTable('users', true);
  }
}
