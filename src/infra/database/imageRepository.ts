import { Image, SearchCriteria } from '../../dto/image';

export interface ImageRepository {
  getAll(): Promise<Image[]>;
  getById(imageId: number): Promise<Image | undefined>;
  add(image: Image): Promise<number>;
  delete(imageId: number);
  update(image: Image);
  search(searchCriteria: SearchCriteria): Promise<Image[]>;
}
