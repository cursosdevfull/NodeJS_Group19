import { IResponseDto } from '../../modules/course/application/dtos/course-response.dto';
import { PageResult } from '../interfaces/page-result';
import { BasePort } from '../port/base.port';

export abstract class BaseApplication<
  Model,
  Port extends BasePort<Model>,
  Response,
  Dto extends IResponseDto<Model, Response>,
> {
  constructor(
    private readonly port: Port,
    private readonly dto: Dto,
  ) {}

  async save(model: Model): Promise<Response> {
    const modelResponse = await this.port.save(model);
    return this.dto.fromDomainToResponse(modelResponse) as Response;
  }

  async delete(id: number): Promise<void> {
    return this.port.delete(id);
  }

  async get(id: number): Promise<Model | null> {
    const modelResponse = await this.port.get(id);
    return modelResponse
      ? (this.dto.fromDomainToResponse(modelResponse) as Model)
      : null;
  }

  async list(): Promise<Model[]> {
    const modelResponse = await this.port.list();
    return this.dto.fromDomainToResponse(modelResponse) as Model[];
  }

  async getByPage(page: number, pageSize: number): Promise<PageResult<Model>> {
    const modelResponse = await this.port.getByPage(page, pageSize);
    modelResponse.data = this.dto.fromDomainToResponse(
      modelResponse.data,
    ) as Model[];
    return modelResponse;
  }
}
