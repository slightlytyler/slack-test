import UI from 'core/UI';
import Root from './Root';
import './styles/main.styl';

const renderApp = UI.render(document.querySelector('#root'));

renderApp(<Root />);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line global-require
    const HotRoot = require('./Root').default;
    renderApp(<HotRoot />);
  });
}
