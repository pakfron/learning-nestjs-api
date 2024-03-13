import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1710351312010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //RAWSQL FOR NEW SCHEMA
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // reverts things made in "up" method
    }

}
