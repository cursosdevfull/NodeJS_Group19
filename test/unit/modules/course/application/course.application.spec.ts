import { CourseApplication } from '../../../../../src/modules/course/application/course.application';
import { CourseResponse } from '../../../../../src/modules/course/application/dtos/course-response.dto';
import { Course } from '../../../../../src/modules/course/models/course';
import { CoursePort } from '../../../../../src/modules/course/ports/course.port';

describe('CourseApplication', () => {
  describe('constructor', () => {
    it('should create an instance of CourseApplication', () => {
      const coursePort = {} as any;
      const courseApplication = new CourseApplication(coursePort);
      expect(courseApplication).toBeInstanceOf(CourseApplication);
    });
  });

  describe('Operations', () => {
    let coursePort: CoursePort;
    let courseApplication: CourseApplication;
    let course: Course;

    beforeEach(() => {
      course = {
        title: 'Course 1',
        active: true,
        description: 'Description 1',
      };

      coursePort = {
        save: jest.fn().mockResolvedValue({ ...course, id: 1 } as Course),
        delete: jest.fn().mockResolvedValue(undefined),
        get: jest.fn().mockResolvedValue({ ...course, id: 1 } as Course),
        list: jest.fn().mockResolvedValue([{ ...course, id: 1 }] as Course[]),
        getByPage: jest.fn().mockResolvedValue({
          data: [{ ...course, id: 1 }],
          page: 1,
          pageSize: 10,
          total: 1,
        }),
      };

      courseApplication = new CourseApplication(coursePort);
    });

    it('should save a course', async () => {
      const response = await courseApplication.save(course);

      expect(coursePort.save).toHaveBeenCalledWith(course);
      expect(coursePort.save).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(CourseResponse);
      expect(response).toHaveProperty('id', 1);
      expect(response).toHaveProperty('title', 'Course 1');
      expect(response).toHaveProperty('description', 'Description 1');
      expect(response).toEqual({
        id: 1,
        title: course.title,
        description: course.description,
      });
    });

    it('should delete a course', async () => {
      await courseApplication.delete(1);

      expect(coursePort.delete).toHaveBeenCalledWith(1);
      expect(coursePort.delete).toHaveBeenCalledTimes(1);
    });

    it('should get a course by id', async () => {
      const response = await courseApplication.get(1);

      expect(coursePort.get).toHaveBeenCalledWith(1);
      expect(coursePort.get).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(CourseResponse);
      expect(response).toHaveProperty('id', 1);
      expect(response).toHaveProperty('title', 'Course 1');
      expect(response).toHaveProperty('description', 'Description 1');
    });

    it('should return null when course is not found', async () => {
      coursePort.get = jest.fn().mockResolvedValue(null);

      const response = await courseApplication.get(1);

      expect(coursePort.get).toHaveBeenCalledWith(1);
      expect(coursePort.get).toHaveBeenCalledTimes(1);
      expect(response).toBeNull();
    });

    it('should list all courses', async () => {
      const response = await courseApplication.list();

      expect(coursePort.list).toHaveBeenCalled();
      expect(coursePort.list).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(1);
      expect(response[0]).toBeInstanceOf(CourseResponse);
      expect(response[0]).toHaveProperty('id', 1);
      expect(response[0]).toHaveProperty('title', 'Course 1');
      expect(response[0]).toHaveProperty('description', 'Description 1');
    });

    it('should get courses by page', async () => {
      const response = await courseApplication.getByPage(1, 10);

      expect(coursePort.getByPage).toHaveBeenCalledWith(1, 10);
      expect(coursePort.getByPage).toHaveBeenCalledTimes(1);
      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('page', 1);
      expect(response).toHaveProperty('pageSize', 10);
      expect(response).toHaveProperty('total', 1);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data[0]).toBeInstanceOf(CourseResponse);
      expect(response.data[0]).toHaveProperty('id', 1);
      expect(response.data[0]).toHaveProperty('title', 'Course 1');
      expect(response.data[0]).toHaveProperty('description', 'Description 1');
    });
  });
});
