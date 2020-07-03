import { ImageStatus } from '../../dto/image/imageStatus';

export interface ImageStatusRepository {
  getAll(): Promise<ImageStatus[]>;
}
