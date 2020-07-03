import { Image } from '../../dto/image';
import { ImageSearchCriteria } from '../../dto/image/imageSearchCriteria';

export interface ImageRepository {
  getById(imageId: number): Promise<Image | undefined>;
  add(image: Image);
  delete(imageId: number);
  update(image: Image);
  search(searchCriteria: ImageSearchCriteria): Promise<void>;
}
