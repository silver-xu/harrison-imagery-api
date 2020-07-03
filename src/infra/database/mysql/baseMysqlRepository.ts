import { Pool } from 'mysql2/promise';

export abstract class BaseMysqlRepository {
  protected pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
}
