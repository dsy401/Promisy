import { defer } from '../defer';

describe('defer', () => {
  it('should be able to resolve defer promise', (done) => {
    const { promise, resolve } = defer<number>();

    const resolvedValue = 100;

    promise.then((val) => {
      expect(val).toEqual(resolvedValue);
      done();
    });

    setTimeout(() => {
      resolve(resolvedValue);
    }, 100);
  });

  it('should be able to reject defer promise', (done) => {
    const { promise, reject } = defer<number>();

    const error = new Error('Something went wrong');

    promise.catch((err) => {
      expect(err).toEqual(error);
      done();
    });

    setTimeout(() => {
      reject(error);
    }, 100);
  });
});
