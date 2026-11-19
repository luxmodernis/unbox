// Chapitre 1 : modèle de chapitre. Une conversation de chapitre ne touche que ses propres fichiers (chapterN.ts, ses styles .c1-…, ses clés ch1.*)
// et sa ligne dans src/chapters.ts (écrans et titres, utilisés par le fil d'ariane et le plan du mode dev).
// Chaque chapitre exporte mount(root, ecran) ; pour changer d'écran ou de chapitre : go(chapitre, ecran) du routeur.
import { t } from './i18n';
import { go } from './router';
import { markSeen } from './state';

export function mount(root: HTMLElement, screen: number): void {
  root.innerHTML = screen === 1
    ? `<section class="c1-section"><h1>${t('ch1.title')}</h1><p>${t('ch1.intro')}</p><button class="c1-next">${t('ui.next')}</button></section>`
    : `<section class="c1-section"><h1>${t('ch1.screen2')}</h1><p>${t('ch1.end')}</p></section>`;
  root.querySelector('.c1-next')?.addEventListener('click', () => go(1, 2));
  markSeen(1);
}
