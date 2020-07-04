import { LabelRepository } from '../labelRepository';
import { Label } from '../../../dto/label';
import { BaseMysqlRepository } from './baseMysqlRepository';
import { RowDataPacket } from 'mysql2/promise';

export class MysqlLabelRepository extends BaseMysqlRepository implements LabelRepository {
  async getById(labelId: number): Promise<Label> {
    const [rows] = (await this.pool.query('SELECT label_id, label, status_code FROM labels WHERE label_id = ?', [
      labelId,
    ])) as RowDataPacket[];

    if (rows.length === 0) {
      return undefined;
    }

    const { label_id, label, status_code } = rows[0];

    return {
      labelId: label_id,
      label,
      statusCode: status_code,
    };
  }
  async add(label: Label) {
    await this.pool.execute('INSERT INTO labels (label) VALUES (?)', [label.label]);
  }
}
