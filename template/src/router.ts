// Navigation entre chapitres et écrans. Les chapitres appellent go(chapitre, ecran), jamais location directement.
// - Production (LMS, package) : une seule URL pour tout le parcours, la navigation reste en mémoire.
// - Mode dev (voir dev.ts) : une URL complète par écran (#/ch/2/3) pour sauter directement où on veut, et un plan de tous les écrans (#/dev).
import { CHAPTERS } from './chapters';
import { DEV } from './dev';
import { t } from './i18n';

interface Route { chapter: number; screen: number }

const dev = DEV ? import('./devtools') : null; // le bandeau et le plan ne sont chargés qu'en mode dev
let root: HTMLElement;

function parse(): Route | 'index' {
  if (DEV) {
    if (location.hash === '#/dev') return 'index';
    const m = location.hash.match(/^#\/ch\/(\d+)(?:\/(\d+))?$/);
    if (m) return { chapter: Number(m[1]), screen: Number(m[2] ?? 1) };
  }
  return { chapter: CHAPTERS[0].id, screen: 1 };
}

async function render(route: Route | 'index'): Promise<void> {
  if (route === 'index') {
    const d = await dev!;
    d.renderIndex(root, CHAPTERS);
    d.setCrumb(['Plan']);
    return;
  }
  const def = CHAPTERS.find((c) => c.id === route.chapter) ?? CHAPTERS[0];
  const screen = Math.min(Math.max(route.screen, 1), def.screens.length);
  const mod = await def.load();
  mod.mount(root, screen);
  root.scrollTop = 0;
  void dev?.then((d) => d.setCrumb([t(def.title), t(def.screens[screen - 1])]));
}

/** Va à un écran d'un chapitre (écran 1 par défaut). */
export function go(chapter: number, screen = 1): void {
  if (DEV) location.hash = `/ch/${chapter}/${screen}`; // déclenche hashchange, donc l'affichage (et le retour arrière du navigateur marche)
  else void render({ chapter, screen });
}

export function start(el: HTMLElement): void {
  root = el;
  if (DEV) addEventListener('hashchange', () => void render(parse()));
  void render(parse());
}
