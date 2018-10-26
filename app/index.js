import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.global.css';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import * as winShell from './win-shell'

const store = configureStore();

// winShell.fileContextMenu.register();
// winShell.fileHandler.register();
// winShell.folderBackgroundContextMenu.register();
// winShell.folderContextMenu.register();

render(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
