/* eslint-disable @typescript-eslint/no-explicit-any */
/* any has to be enabled on this file to be compatible with Pool class in mysql2 package*/

import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface ConnectionPool {
  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
  ): Promise<[T, FieldPacket[]]>;

  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;

  execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;
}
