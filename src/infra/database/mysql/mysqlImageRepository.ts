import { RowDataPacket } from 'mysql2/promise';

import { Image } from '../../../dto/image';
import { SearchCriteria } from '../../../dto/image';
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

  async add(image: Image): Promise<number> {
    const result = (await this.pool.execute(
      'INSERT INTO images (image_path, width, height, status_code) VALUES (?,?,?,?)',
      [image.imagePath, image.width, image.height, image.statusCode],
    )) as RowDataPacket[];

    if (result.length === 0 || !result[0]['insertId']) {
      throw new Error('Image insertion failed');
    }

    return result[0]['insertId'];
  }

  async delete(imageId: number): Promise<void> {
    await this.pool.execute("UPDATE images SET status_code = 'Deleted' WHERE image_id = ?", [imageId]);
  }

  async update(image: Image): Promise<void> {
    await this.pool.execute('UPDATE images SET image_path=?, width=?, height=?, status_code=? WHERE image_id = ?', [
      image.imagePath,
      image.width,
      image.height,
      image.imageId,
      image.statusCode,
    ]);
  }

  async search(searchCriteria: SearchCriteria): Promise<Image[]> {
    const [rows] = (await this.pool.query(
      `SELECT DISTINCT 
              images.image_id,
              images.image_path,
              images.width,
              images.height,
              images.status_code
      FROM images      
      LEFT JOIN image_label
        ON images.image_id = image_label.image_id
      LEFT JOIN labels
        ON  image_label.label_id = labels.label_id
      WHERE         
        (? IS NULL OR labels.label_id = ?) AND
        ((? IS NULL OR ? IS NULL) OR image_label.labelled_date BETWEEN ? AND ?) AND
        (? IS NULL OR images.status_code = ?) AND
        images.status_code <> 'Deleted' AND
        labels.status_code <> 'Deleted'`,
      [
        searchCriteria.labelId,
        searchCriteria.labelId,
        searchCriteria.startDate,
        searchCriteria.endDate,
        searchCriteria.startDate,
        searchCriteria.endDate,
        searchCriteria.imageStatusCode,
        searchCriteria.imageStatusCode,
      ],
    )) as RowDataPacket[];

    return rows.map((row) => ({
      imageId: row['image_id'],
      imagePath: row['image_path'],
      width: row['width'],
      height: row['height'],
      statusCode: row['status_code'],
    }));
  }
}
