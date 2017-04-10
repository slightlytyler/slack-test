import 'whatwg-fetch';
import UI from 'core/UI';
import App from 'components/App';
import './styles/main.styl';

const renderApp = element => UI.render(element, document.querySelector('#root'));

renderApp(<App />);

if (module.hot) {
  module.hot.accept('components/App', () => {
    // eslint-disable-next-line global-require
    const HotApp = require('components/App').default;
    renderApp(<HotApp />);
  });
}
