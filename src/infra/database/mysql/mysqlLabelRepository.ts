import { RowDataPacket } from 'mysql2/promise';

import { Label } from '../../../dto/label';
import { LabelRepository } from '../labelRepository';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlLabelRepository extends BaseMysqlRepository implements LabelRepository {
  async getById(labelId: number): Promise<Label> {
    const [
      rows,
    ] = (await this.pool.query(
      "SELECT label_id, label, status_code FROM labels WHERE label_id = ? AND status_code <> 'Deleted'",
      [labelId],
    )) as RowDataPacket[];

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

  async add(label: Label): Promise<number> {
    const result = (await this.pool.execute('INSERT INTO labels (label, status_code) VALUES (?, ?)', [
      label.label,
      label.statusCode,
    ])) as RowDataPacket[];

    if (result.length === 0 || !result[0]['insertId']) {
      throw new Error('Image insertion failed');
    }

    return result[0]['insertId'];
  }

  async update(label: Label): Promise<void> {
    await this.pool.execute('UPDATE labels SET label = ? WHERE label_id = ?', [label.label, label.labelId]);
  }

  async delete(labelId: number): Promise<void> {
    await this.pool.execute("UPDATE labels SET status_code = 'Deleted' WHERE label_id = ?", [labelId]);
  }
}
