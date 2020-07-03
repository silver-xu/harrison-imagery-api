import { createPool } from 'mysql2/promise';
import { config } from '../../config';
import { ImageRepository } from './imageRepository';
import { MysqlImageRepository } from './mysql/mysqlImageRepository';
import { ImageStatusRepository } from './imageStatusRepository';
import { MysqlImageStatusRepository } from './mysql/mysqlImageStatusRepository';
import { LabelRepository } from './labelRepository';
import { MysqlLabelRepository } from './mysql/mysqlLabelRepository';
import { ImageLabelRepository } from './imageLabelRepository';
import { MysqlImageLabelRepository } from './mysql/mysqlImageLabelRepository';
import { AuthTokenRepository } from './authTokenRepository';
import { MysqlAuthTokenRepository } from './mysql/mysqlAuthTokenRepository';

const { NODE_ENV } = process.env;
const { host, user, password } = config[NODE_ENV];

const pool = createPool({
  host,
  user,
  password,
  database: 'imagery',
});

export const imageRepository: ImageRepository = new MysqlImageRepository(pool);
export const imageStatusRepository: ImageStatusRepository = new MysqlImageStatusRepository(pool);
export const labelRepository: LabelRepository = new MysqlLabelRepository(pool);
export const imageLabelRepository: ImageLabelRepository = new MysqlImageLabelRepository(pool);
export const authTokenRepository: AuthTokenRepository = new MysqlAuthTokenRepository(pool);

export const endPool = async () => {
  await pool.end();
};
