import { Label } from '../label';

export interface Labelling extends Label {
  imageLabelId: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
