import { AddImageLabelModel } from '../domains/imageLabelModels';
import { ImageLabel } from '../dto/imageLabel';

export const mapFromAddImageLabelModel = (addImageLabelModel: AddImageLabelModel): ImageLabel => ({
  imageLabelId: 0,
  ...addImageLabelModel,
});
