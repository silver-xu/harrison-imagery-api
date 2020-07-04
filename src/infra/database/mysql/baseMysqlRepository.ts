import { ConnectionPool } from './connectionPool';

export abstract class BaseMysqlRepository {
  protected pool: ConnectionPool;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }
}
