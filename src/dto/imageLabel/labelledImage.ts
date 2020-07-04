import { Image } from '../image';

export interface LabelledImage extends Image {
  labelId: number;
  imageLabelId: number;
  labelX: number;
  labelY: number;
  labelWidth: number;
  labelHeight: number;
}
