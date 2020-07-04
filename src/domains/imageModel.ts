export interface ImageModel {
  imageId: number;
  imagePath: string;
  width: number;
  height: number;
  statusCode: string;
  imageLabels: ImageLabelModel[];
}

export interface ImageLabelModel {
  labelId: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
