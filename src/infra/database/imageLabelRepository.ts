import { ImageLabel, Labelling } from '../../dto/imageLabel';
import { LabelledImage } from '../../dto/imageLabel/labelledImage';

export interface ImageLabelRepository {
  add(imageLabel: ImageLabel);
  delete(imageLabelId: number);
  getById(imageLabelId: number);
  getLabellingsByImageId(imageId: number): Promise<Labelling[]>;
  getLabelledImagesByLabelId(labelId: number): Promise<LabelledImage[]>;
}
