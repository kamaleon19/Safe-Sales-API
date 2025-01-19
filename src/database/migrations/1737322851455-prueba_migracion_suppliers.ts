import { MigrationInterface, QueryRunner } from "typeorm";

export class PruebaMigracionSuppliers1737322851455 implements MigrationInterface {
    name = 'PruebaMigracionSuppliers1737322851455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "prueba" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdAt" SET DEFAULT '"2025-01-19T21:40:54.727Z"'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '"2025-01-19T21:40:55.170Z"'`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "createdAt" SET DEFAULT '"2025-01-19T21:40:55.182Z"'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT '"2025-01-19T21:40:55.187Z"'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updatedAt" SET DEFAULT '"2025-01-19T21:40:55.187Z"'`);
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "createdAt" SET DEFAULT '"2025-01-19T21:40:55.894Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "createdAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updatedAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "createdAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "sale" ALTER COLUMN "createdAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdAt" SET DEFAULT '2025-01-17'`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "prueba"`);
    }

}
