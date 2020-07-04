import { RowDataPacket } from 'mysql2/promise';

import { AuthToken } from '../../../dto/auth';
import { AuthTokenRepository } from '../authTokenRepository';
import { BaseMysqlRepository } from './baseMysqlRepository';

export class MysqlAuthTokenRepository extends BaseMysqlRepository implements AuthTokenRepository {
  async getByToken(token: string): Promise<AuthToken | undefined> {
    const [rows] = (await this.pool.query('SELECT token_id, token, expiry_date FROM auth_tokens WHERE token = ?', [
      token,
    ])) as RowDataPacket[];

    if (rows.length === 0) {
      return undefined;
    }

    return rows.map((row) => ({
      tokenId: row['token_id'],
      token: row['token'],
      expiryDate: row['expiry_date'],
    }));
  }
}
