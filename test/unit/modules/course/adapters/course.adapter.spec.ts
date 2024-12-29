import { DataSource, Repository } from 'typeorm';

import { DatabaseBootstrap } from '../../../../../src/bootstrap/database.bootstrap';
import { CourseAdapter } from '../../../../../src/modules/course/adapters/course.adapter';
import { CourseEntity } from '../../../../../src/modules/course/entities/course.entity';
import { Course } from '../../../../../src/modules/course/models/course';

describe('CourseAdapter', () => {
  let courseAdapter: CourseAdapter;
  let repository: Repository<CourseEntity>;
  let course: Course;
  let courseEntity: CourseEntity;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      findAndCount: jest.fn(),
    } as unknown as Repository<CourseEntity>;

    const dataSource = {
      getRepository: jest.fn().mockReturnValue(repository),
    } as unknown as DataSource;

    DatabaseBootstrap.appDataSource = dataSource;
    courseAdapter = new CourseAdapter();

    course = {
      title: 'Course 1',
      description: 'Description 1',
      active: true,
    };

    courseEntity = new CourseEntity();
    courseEntity.id = 1;
    courseEntity.title = 'Course 1';
    courseEntity.description = 'Description 1';
    courseEntity.active = true;
  });

  describe('save', () => {
    it('should save a course', async () => {
      repository.save = jest.fn().mockResolvedValue(courseEntity);

      const result = await courseAdapter.save(course);

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(course);
    });

    it('should throw an error when save fails', async () => {
      repository.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(courseAdapter.save(course)).rejects.toThrow(
        'Error saving entity: CourseEntity',
      );
    });
  });

  describe('delete', () => {
    it('should delete a course', async () => {
      repository.findOne = jest.fn().mockResolvedValue(courseEntity);
      repository.save = jest
        .fn()
        .mockResolvedValue({ ...courseEntity, active: false });

      await courseAdapter.delete(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should not throw error if course does not exist', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      await courseAdapter.delete(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should get a course by id', async () => {
      repository.findOne = jest.fn().mockResolvedValue(courseEntity);

      const result = await courseAdapter.get(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, active: true },
      });

      expect(result).toEqual({
        id: courseEntity.id,
        title: course.title,
        description: course.description,
        active: course.active,
      });
    });

    it('should return null when course is not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      const result = await courseAdapter.get(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, active: true },
      });
      expect(result).toBeNull();
    });
  });

  describe('list', () => {
    it('should list all active courses', async () => {
      repository.find = jest.fn().mockResolvedValue([courseEntity]);

      const result = await courseAdapter.list();

      expect(repository.find).toHaveBeenCalledWith({
        where: { active: true },
      });
      expect(result).toEqual([{ ...course, id: courseEntity.id }]);
    });

    it('should return empty array when no courses found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      const result = await courseAdapter.list();

      expect(repository.find).toHaveBeenCalledWith({
        where: { active: true },
      });
      expect(result).toEqual([]);
    });
  });

  describe('getByPage', () => {
    it('should get courses by page', async () => {
      repository.findAndCount = jest
        .fn()
        .mockResolvedValue([[courseEntity], 1]);

      const result = await courseAdapter.getByPage(1, 10);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { active: true },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        data: [{ ...course, id: courseEntity.id }],
        page: 1,
        pageSize: 10,
        total: 1,
      });
    });

    it('should return empty page result when no courses found', async () => {
      repository.findAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await courseAdapter.getByPage(1, 10);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: { active: true },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
      });
    });
  });
});
