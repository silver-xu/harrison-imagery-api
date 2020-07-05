import { Label } from '../../dto/label';
import { LabelPosition } from '../common';

export interface LabellingModel {
  label: Label;
  labelPositions: LabelPosition[];
}
