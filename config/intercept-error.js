const originConsoleError = console.error;
let errors = [];

console.error = (...args) => {
  errors.push(args);
  originConsoleError.apply(console, args);
};
export const consoleErrors = {
  reset: () => (errors = []),
  get: () =>
    errors.slice().map((args) =>
      args.reduce((acc, arg) => {
        return acc + arg;
      }, ''),
    ),
};

beforeEach(() => (errors = []));

afterEach(() => {
  if (errors.length > 0) {
    throw new Error(`Test has ${errors.length} Unhandled Errors:\n${errors}`);
  }
});
