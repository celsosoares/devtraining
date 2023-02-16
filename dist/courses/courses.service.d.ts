import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
export declare class CoursesService {
    private readonly courseRepository;
    private readonly tagRepository;
    constructor(courseRepository: Repository<Course>, tagRepository: Repository<Tag>);
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<Course>;
    private preloadTagByName;
}
