import './style.css';
import { setLanguage } from './i18n';
import { start } from './router';
import { initState } from './state';

const app = document.getElementById('app')!;

// hauteur exacte de la zone visible, en px : les sections plein écran s'y calent sans dépasser (pas de micro-scroll)
const setVh = () => document.documentElement.style.setProperty('--vh', `${app.clientHeight}px`);
new ResizeObserver(setVh).observe(app);
setVh();

initState();
setLanguage('en').then(() => start(app));
