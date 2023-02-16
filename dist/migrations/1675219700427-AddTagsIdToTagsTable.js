"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTagsIdToTagsTable1675219700427 = void 0;
const typeorm_1 = require("typeorm");
class AddTagsIdToTagsTable1675219700427 {
    async up(queryRunner) {
        await queryRunner.addColumn('courses_tags', new typeorm_1.TableColumn({
            name: 'tagsId',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('courses_tags', new typeorm_1.TableForeignKey({
            name: 'courses_tags_tags',
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_tags');
        await queryRunner.dropColumn('courses_tags', 'tagsId');
    }
}
exports.AddTagsIdToTagsTable1675219700427 = AddTagsIdToTagsTable1675219700427;
//# sourceMappingURL=1675219700427-AddTagsIdToTagsTable.js.map