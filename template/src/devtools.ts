// Outils du mode dev (chargé uniquement si DEV, voir dev.ts) : bandeau du bas et plan des écrans.
// Le bandeau regroupe le fil d'ariane (chapitre › écran) et la version du build : une capture d'écran suffit à dire à Claude où on est et quelle version on regarde.
// Les textes d'ici sont volontairement en dur : ils n'existent jamais en production, donc jamais à traduire.
import type { ChapterDef } from './chapters';
import { t } from './i18n';

const bar = document.createElement('div');
bar.className = 'devbar';
const crumb = document.createElement('a');
crumb.className = 'devbar-crumb';
crumb.href = '#/dev'; // cliquer sur le fil d'ariane ouvre le plan de tous les écrans
const version = document.createElement('span');
version.textContent = __BUILD__;
bar.append(crumb, version);
document.body.append(bar);
document.body.classList.add('dev');

/** Fil d'ariane affiché à gauche du bandeau, ex. ['Chapitre 1', 'Introduction']. */
export function setCrumb(parts: string[]): void {
  crumb.textContent = parts.join(' › ');
}

/** Plan de tous les écrans, avec leur URL complète. */
export function renderIndex(root: HTMLElement, chapters: ChapterDef[]): void {
  const wrap = document.createElement('section');
  wrap.className = 'dev-index';
  const h = document.createElement('h1');
  h.textContent = 'Plan (mode dev)';
  wrap.append(h);
  for (const c of chapters) {
    const h2 = document.createElement('h2');
    h2.textContent = t(c.title);
    const ul = document.createElement('ul');
    c.screens.forEach((key, i) => {
      const a = document.createElement('a');
      a.href = `#/ch/${c.id}/${i + 1}`;
      a.textContent = `${i + 1}. ${t(key)}`;
      const li = document.createElement('li');
      li.append(a);
      ul.append(li);
    });
    wrap.append(h2, ul);
  }
  root.replaceChildren(wrap);
}
