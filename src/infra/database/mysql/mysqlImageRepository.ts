import { RowDataPacket } from 'mysql2/promise';

import { Image, ImageSearchCriteria } from '../../../dto/image';
import { ImageRepository } from '../imageRepository';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlImageRepository extends BaseMysqlRepository implements ImageRepository {
  async getById(imageId: number): Promise<Image | undefined> {
    const [
      rows,
    ] = (await this.pool.query(
      "SELECT image_id, image_path, width, height, status_code FROM images WHERE image_id = ? AND status_code <> 'Deleted'",
      [imageId],
    )) as RowDataPacket[];

    if (rows.length === 0) {
      return undefined;
    }

    const { image_id, image_path, width, height, status_code } = rows[0];

    return {
      imageId: image_id,
      imagePath: image_path,
      width,
      height,
      statusCode: status_code,
    };
  }

  async add(image: Image): Promise<void> {
    await this.pool.execute('INSERT INTO images (image_path, width, height, status_code) VALUES (?,?,?,?)', [
      image.imagePath,
      image.width,
      image.height,
      image.statusCode,
    ]);
  }

  async delete(imageId: number): Promise<void> {
    await this.pool.execute("UPDATE images SET status_code = 'Deleted' WHERE image_id = ?", [imageId]);
  }

  async update(image: Image): Promise<void> {
    await this.pool.execute('UPDATE images SET image_path=?, width=?, height=? WHERE image_id = ?', [
      image.imagePath,
      image.width,
      image.height,
      image.imageId,
    ]);
  }
}
