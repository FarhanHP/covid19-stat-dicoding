import './styles/style.css';
import './script/component/FooterSection';
import './script/component/StatCard';
import './script/component/SelectCountry';
import './script/component/AppBar';
import './MainApp';
import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = (`
    <main-app/>
  `);
});
