import { Label } from '../../dto/label';

export interface LabelRepository {
  add(label: Label);
  delete(labelId: number);
}
