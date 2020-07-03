import { Image } from '../image/image';
import { Label } from '../label/label';

export interface ImageLabel {
  imageId: number;
  labelId: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
