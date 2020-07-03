import { Image } from '../../dto/image';
import { ImageLabel, Labelling } from '../../dto/imageLabel';

export interface ImageLabelRepository {
  add(imageLabel: ImageLabel);
  delete(imageId: number, labelId: number);
  getLabellingsByImageId(imageId: number): Promise<Labelling[]>;
  getImagesByLabelId(labelId: number): Promise<Image[]>;
}
