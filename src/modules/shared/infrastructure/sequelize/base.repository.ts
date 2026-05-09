import { Model, ModelStatic } from 'sequelize';

export abstract class BaseSequelizeRepository<T extends Model> {
  protected constructor(protected readonly model: ModelStatic<T>) {}
}
