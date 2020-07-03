import { Image } from '../../dto/image';
import { Label } from '../../dto/label';
import { ImageSearchCriteria } from '../../dto/image/imageSearchCriteria';

export interface ImageRepository {
  add(image: Image);
  delete(imageId: number);
  update(image: Image);
  search(searchCriteria: ImageSearchCriteria): Promise<void>;
}
