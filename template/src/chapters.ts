// Registre des chapitres : le routeur, le fil d'ariane et le plan du mode dev (#/dev) se construisent à partir d'ici.
// Ajouter un chapitre = une entrée ; chaque chapitre exporte mount(root, ecran) et déclare ses écrans (clés de texte des titres).
export interface ChapterDef {
  id: number;
  /** clé de texte du titre du chapitre (fil d'ariane) */
  title: string;
  /** clés de texte des titres d'écran, dans l'ordre : l'écran n = screens[n - 1] */
  screens: string[];
  /** chargé à la demande : le premier écran s'affiche sans attendre les autres chapitres */
  load: () => Promise<{ mount: (root: HTMLElement, screen: number) => void }>;
}

export const CHAPTERS: ChapterDef[] = [
  { id: 1, title: 'ch1.title', screens: ['ch1.screen1', 'ch1.screen2'], load: () => import('./chapter1') },
];
