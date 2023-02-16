"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCoursesIdToTagsTable1675219365616 = void 0;
const typeorm_1 = require("typeorm");
class AddCoursesIdToTagsTable1675219365616 {
    async up(queryRunner) {
        await queryRunner.addColumn('courses_tags', new typeorm_1.TableColumn({
            name: 'coursesId',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('courses_tags', new typeorm_1.TableForeignKey({
            name: 'courses_tags_courses',
            columnNames: ['coursesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');
        await queryRunner.dropColumn('courses_tags', 'coursesId');
    }
}
exports.AddCoursesIdToTagsTable1675219365616 = AddCoursesIdToTagsTable1675219365616;
//# sourceMappingURL=1675219365616-AddCoursesIdToTagsTable.js.map