import { cancelablePromise } from '../cancelablePromise';

describe('cancelablePromise', () => {
  it('should be able to resolve without canceling', (done) => {
    const { promise } = cancelablePromise(Promise.resolve('1'));

    promise.then((r) => {
      expect(r).toEqual('1');
      done();
    });
  });

  it('should be able to reject when canceling', (done) => {
    const { promise, cancel } = cancelablePromise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          return resolve();
        }, 1000);
      }),
    );

    promise
      .then((r) => {
        // never reach this line
        expect(false).toBeTruthy();
        done();
      })
      .catch((error) => {
        expect(error).toEqual(new Error('The promise has been cancelled'));
        done();
      });

    cancel();
  });
});
