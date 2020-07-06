import { RowDataPacket } from 'mysql2';

import { ImageLabel, Labelling } from '../../../dto/imageLabel';
import { LabelledImage } from '../../../dto/imageLabel/labelledImage';
import { ImageLabelRepository } from '../imageLabelRepository';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlImageLabelRepository extends BaseMysqlRepository implements ImageLabelRepository {
  async getById(imageLabelId: number): Promise<ImageLabel> {
    const [rows] = (await this.pool.query(
      `SELECT image_label_id, 
              image_label.image_id, 
              image_label.label_id, 
              image_label.x, 
              image_label.y, 
              image_label.width, 
              image_label.height,
              image_label.labelled_date
        FROM image_label 
        INNER JOIN images
          ON image_label.image_id = images.image_id
        INNER JOIN labels
          ON  image_label.label_id = labels.label_id
        WHERE image_label_id = ? 
          AND images.status_code <> 'Deleted' 
          AND labels.status_code <> 'Deleted'`,
      [imageLabelId],
    )) as RowDataPacket[];

    if (rows.length === 0) {
      return undefined;
    }

    const { image_label_id, image_id, label_id, x, y, width, height, labelled_date } = rows[0];

    return {
      imageLabelId: image_label_id,
      imageId: image_id,
      labelId: label_id,
      x,
      y,
      width,
      height,
      labelledDate: labelled_date,
    };
  }

  async add(imageLabel: ImageLabel): Promise<number> {
    const result = (await this.pool.execute(
      'INSERT INTO image_label (image_id, label_id, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?)',
      [imageLabel.imageId, imageLabel.labelId, imageLabel.x, imageLabel.y, imageLabel.width, imageLabel.height],
    )) as RowDataPacket[];

    if (result.length === 0 || !result[0]['insertId']) {
      throw new Error('Image insertion failed');
    }

    return result[0]['insertId'];
  }

  async delete(imageLabelId: number): Promise<void> {
    await this.pool.execute('DELETE FROM image_label WHERE image_label_id = ?', [imageLabelId]);
  }

  async getLabellingsByImageId(imageId: number): Promise<Labelling[]> {
    const [rows] = (await this.pool.query(
      `SELECT labels.label_id, 
              labels.label, 
              labels.status_code,
              image_label.image_label_id,
              image_label.x, 
              image_label.y, 
              image_label.width, 
              image_label.height,
              image_label.labelled_date
      FROM image_label 
      INNER JOIN images
        ON image_label.image_id = images.image_id
      INNER JOIN labels
        ON  image_label.label_id = labels.label_id
      WHERE images.image_id = ? 
        AND images.status_code <> 'Deleted'
        AND labels.status_code <> 'Deleted'`,
      [imageId],
    )) as RowDataPacket[];

    return rows.map((row) => ({
      imageLabelId: row['image_label_id'],
      labelId: row['label_id'],
      label: row['label'],
      statusCode: row['status_code'],
      x: row['x'],
      y: row['y'],
      width: row['width'],
      height: row['height'],
      labelledDate: row['labelled_date'],
    }));
  }

  async getLabelledImagesByLabelId(labelId: number): Promise<LabelledImage[]> {
    const [rows] = (await this.pool.query(
      `SELECT images.image_id,
              images.image_path,
              images.width,
              images.height,
              images.status_code,
              image_label.image_label_id,
              image_label.label_id,
              image_label.x AS label_x,
              image_label.y AS label_y,
              image_label.width AS label_width,
              image_label.height as label_height
              image_label.labelled_date
      FROM image_label      
      INNER JOIN images
        ON image_label.image_id = images.image_id
      INNER JOIN labels
        ON  image_label.label_id = labels.label_id
      WHERE labels.label_id = ?
        AND images.status_code <> 'Deleted'
        AND labels.status_code <> 'Deleted'`,
      [labelId],
    )) as RowDataPacket[];

    return rows.map((row) => ({
      imageId: row['image_id'],
      imagePath: row['image_path'],
      width: row['width'],
      height: row['height'],
      statusCode: row['status_code'],
      imageLabelId: row['image_label_id'],
      labelId: row['label_id'],
      labelX: row['label_x'],
      labelY: row['label_y'],
      labelWidth: row['label_width'],
      labelHeight: row['label_height'],
      labelledDate: row['labelled_date'],
    }));
  }
}
