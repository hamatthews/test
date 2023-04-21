/* eslint-disable @typescript-eslint/naming-convention */
import { MongoClient } from 'mongodb';

declare global {
  let _mongoClientPromise: Promise<MongoClient>;
}
