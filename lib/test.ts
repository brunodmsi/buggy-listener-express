import express from 'express';
import lib from '.';

const app = express();

app.get('/', (req, res) => {
  function testdad() {
    return aa;
  }

  testdad();

  return res.send();
});

app.use(lib);

app.listen(8081);
