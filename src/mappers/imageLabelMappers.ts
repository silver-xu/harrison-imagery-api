import { ImageLabel } from '../dto/imageLabel';
import { AddImageLabelModel } from '../domains/imageLabelModels';

export const mapFromAddImageLabelModel = (addImageLabelModel: AddImageLabelModel): ImageLabel => addImageLabelModel;
