import { ImageRepository } from '../imageRepository';
import { Image, ImageSearchCriteria } from '../../../dto/image';
import { BaseMysqlRepository } from './baseMysqlRepository';
import { Label } from '../../../dto/label';

export class MysqlImageRepository extends BaseMysqlRepository implements ImageRepository {
  async add(image: Image) {
    await this.pool.execute('INSERT INTO images (image_path, width, height, status_code) VALUES (?,?,?,?)', [
      image.imagePath,
      image.width,
      image.height,
      image.statusCode,
    ]);
  }

  async delete(imageId: number) {
    await this.pool.execute('DELETE FROM images WHERE image_id = ?', [imageId]);
  }

  async update(image: Image) {
    await this.pool.execute('UPDATE images SET image_path=?, width=?, height=?, status_code=? WHERE image_id = ?', [
      image.imagePath,
      image.width,
      image.height,
      image.statusCode,
      image.imageId,
    ]);
  }

  search(searchCriteria: ImageSearchCriteria): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
