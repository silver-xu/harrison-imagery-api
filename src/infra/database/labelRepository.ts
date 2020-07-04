import { Label } from '../../dto/label';

export interface LabelRepository {
  getById(labelId: number): Promise<Label | undefined>;
  add(label: Label);
  update(label: Label);
  delete(labelId: number);
}
