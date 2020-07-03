import { ImageStatusRepository } from '../imageStatusRepository';
import { ImageStatus } from '../../../dto/image';
import { RowDataPacket } from 'mysql2/promise';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlImageStatusRepository extends BaseMysqlRepository implements ImageStatusRepository {
  async getAll(): Promise<ImageStatus[]> {
    const [rows] = (await this.pool.query(
      'SELECT image_status_code, description FROM image_status',
    )) as RowDataPacket[];

    return rows.map((row) => ({
      imageStatusCode: row['image_status_code'],
      description: row['description'],
    }));
  }
}
