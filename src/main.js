import App from 'components/App';
import UI from 'core/UI';
import 'whatwg-fetch';
import './styles/main.styl';

const renderApp = element => UI.render(element, document.querySelector('#root'));

renderApp(<App />);

// if (module.hot) {
//   module.hot.accept('components/App', () => {
//     // eslint-disable-next-line global-require
//     const HotApp = require('components/App').default;
//     renderApp(<HotApp />);
//   });
// }
