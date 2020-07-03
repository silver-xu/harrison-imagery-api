import { Image } from '../image';

export interface LabelledImage extends Image {
  labelId: number;
  labelX: number;
  labelY: number;
  labelWidth: number;
  labelHeight: number;
}
