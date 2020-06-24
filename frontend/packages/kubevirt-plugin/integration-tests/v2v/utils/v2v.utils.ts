export async function readFile(filename: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  const fs = require('fs');
  // eslint-disable-next-line node/prefer-promises/fs
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      // eslint-disable-next-line no-console
      return console.log(err);
    }
    return data;
  });
}
