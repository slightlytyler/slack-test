import Element from 'core/Element';
import Dom from 'core/Dom';
import Root from './Root';

console.log(document.querySelector('#root'));

Dom.render(<div><span>Test</span></div>, document.querySelector('#root'));
