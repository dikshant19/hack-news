import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../src/redux/configureStore';

import App from '../src/App';

const PORT = process.env.PORT || 3000;
const app = express();
const store = configureStore();

app.listen(process.env.PORT || 3000, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});
app.get('/', (req, res) => {
  const preloadedState = store.getState();

  const html = ReactDOM.renderToString(
    <Provider store={store}>
      <App context={preloadedState} />
    </Provider>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, Something went wrong!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
