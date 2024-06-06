type CancelablePromise<T> = {
  cancel: () => void;
  promise: Promise<T>;
};
export function cancelablePromise<T>(promise: Promise<T>): CancelablePromise<T> {
  let rejectFn: ((reason?: any) => void) | null = null;

  const cancelablePromise = new Promise<T>((resolve, reject) => {
    rejectFn = reject;

    promise.then(resolve).catch(reject);
  });

  return {
    promise: cancelablePromise,
    cancel: () => {
      rejectFn && rejectFn(new Error('The promise has been cancelled'));
    },
  };
}
