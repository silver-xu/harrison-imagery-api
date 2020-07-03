import { LabelRepository } from '../labelRepository';
import { Label } from '../../../dto/label';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlLabelRepository extends BaseMysqlRepository implements LabelRepository {
  async add(label: Label) {
    await this.pool.execute('INSERT INTO labels (label) VALUES (?)', [label.label]);
  }
  async delete(labelId: number) {
    await this.pool.execute('DELETE FROM labels WHERE label_id=?', [labelId]);
  }
}
