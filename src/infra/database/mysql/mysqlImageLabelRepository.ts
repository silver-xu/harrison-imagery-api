import { ImageLabelRepository } from '../imageLabelRepository';
import { Image } from '../../../dto/image';
import { ImageLabel, Labelling } from '../../../dto/imageLabel';
import { BaseMysqlRepository } from './baseMysqlRepository';
import { RowDataPacket } from 'mysql2';

export class MysqlImageLabelRepository extends BaseMysqlRepository implements ImageLabelRepository {
  async add(imageLabel: ImageLabel) {
    await this.pool.execute(
      'INSERT INTO image_label (image_id, label_id, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?)',
      [imageLabel.imageId, imageLabel.labelId, imageLabel.x, imageLabel.y, imageLabel.width, imageLabel.height],
    );
  }

  async delete(imageId: number, labelId: number) {
    await this.pool.execute('DELETE FROM image_label WHERE image_id=? AND label_id=?', [imageId, labelId]);
  }

  async getLabellingsByImageId(imageId: number): Promise<Labelling[]> {
    const [rows] = (await this.pool.query(
      `SELECT labels.label_id, 
              labels.label, 
              image_label.x, 
              image_label.y, 
              image_label.width, 
              image_label.height 
      FROM image_label 
      INNER JOIN labels ON image_label.label_id = labels.label_id 
      WHERE image_label.image_id = ?`,
      [imageId],
    )) as RowDataPacket[];

    return rows.map((row) => ({
      labelId: row['label_id'],
      label: row['label'],
      x: row['x'],
      y: row['y'],
      width: row['width'],
      height: row['height'],
    }));
  }

  async getImagesByLabelId(labelId: number): Promise<Image[]> {
    const [rows] = (await this.pool.query(
      `SELECT images.image_id,
              images.image_path,
              images.width,
              images.height,
              images.status_code
      FROM image_label      
      INNER JOIN images ON image_label.image_id = images.image_id
      WHERE image_label.label_id = ?`,
      [labelId],
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
