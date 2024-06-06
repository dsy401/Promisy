import { mapEach } from './mapEach';
import { map } from './map';

export async function mapBatch<T, S>(
  items: T[],
  cb: (item: T, i: number) => S | Promise<S>,
  batchSize: number,
): Promise<S[][]>;
export async function mapBatch<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>): Promise<S[][]>;

export async function mapBatch<T, S>(
  items: T[],
  cb: (item: T, i: number) => S | Promise<S>,
  batchSize: number = 10,
): Promise<S[][]> {
  const batches: T[][] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch: T[] = items.slice(i, i + batchSize);
    batches.push(batch);
  }

  return mapEach(batches, async (batch, i) => {
    return await map(batch, (item, j) => {
      return cb(item, i * batchSize + j);
    });
  });
}
