import { Image } from '../../dto/image';

export interface ImageRepository {
  getById(imageId: number): Promise<Image | undefined>;
  add(image: Image);
  delete(imageId: number);
  update(image: Image);
}
