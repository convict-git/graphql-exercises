export const sleep = (timeInMs) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, timeInMs)
  );
};
