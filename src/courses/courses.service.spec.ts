import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} }, // para se conectar com o banco de dados via TypeORM
        {
          // necesssario por conta dos InjectRepository
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        }, // ("instanciado")pega o repositorio a partir da  entidade
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() }, // ("instanciado")pega o repositorio a partir da  entidade
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('buscar curso pelo ID', () => {
      it('deve retornar o objeto Course', async () => {
        const courseId = '1';
        const expectCourse = {};

        courseRepository.findOne.mockReturnValue(expectCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectCourse);
      });

      it('deve retornar um NotFoundException', async () => {
        const courseId = '1';
        courseRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(courseId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Course ID ${courseId} not found`);
        }
      });
    });
  });
});
