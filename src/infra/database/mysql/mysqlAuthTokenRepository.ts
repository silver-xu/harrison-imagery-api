import { AuthTokenRepository } from '../authTokenRepository';
import { AuthToken } from '../../../dto/auth';
import { BaseMysqlRepository } from './baseMysqlRepository';
import { RowDataPacket } from 'mysql2/promise';

export class MysqlAuthTokenRepository extends BaseMysqlRepository implements AuthTokenRepository {
  async getByToken(token: string): Promise<AuthToken> {
    const [rows] = (await this.pool.query('SELECT token_id, token, expiry_date FROM auth_tokens WHERE token = ?', [
      token,
    ])) as RowDataPacket[];

    return rows.map((row) => ({
      tokenId: row['token_id'],
      token: row['token'],
      expiryDate: row['expiry_date'],
    }));
  }
}
