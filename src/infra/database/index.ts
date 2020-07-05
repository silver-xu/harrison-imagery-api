import { createPool } from 'mysql2/promise';

import { config } from '../../config';
import { AuthTokenRepository } from './authTokenRepository';
import { ImageLabelRepository } from './imageLabelRepository';
import { ImageRepository } from './imageRepository';
import { ImageStatusRepository } from './imageStatusRepository';
import { LabelRepository } from './labelRepository';
import { MysqlAuthTokenRepository } from './mysql/mysqlAuthTokenRepository';
import { MysqlImageLabelRepository } from './mysql/mysqlImageLabelRepository';
import { MysqlImageRepository } from './mysql/mysqlImageRepository';
import { MysqlLabelRepository } from './mysql/mysqlLabelRepository';

const { NODE_ENV } = process.env;
const { host, user, password } = config[NODE_ENV];

const pool = createPool({
  host,
  user,
  password,
  database: 'imagery',
});

export const imageRepository: ImageRepository = new MysqlImageRepository(pool);
export const labelRepository: LabelRepository = new MysqlLabelRepository(pool);
export const imageLabelRepository: ImageLabelRepository = new MysqlImageLabelRepository(pool);
export const authTokenRepository: AuthTokenRepository = new MysqlAuthTokenRepository(pool);

export const endPool = async (): Promise<void> => {
  await pool.end();
};
