// Mode dev : `npm run dev` et site de test Vercel. Jamais dans un package SCORM ou HTML (livrés sur un autre domaine).
// Active : le bandeau du bas (fil d'ariane + version) et les URL complètes par écran (#/ch/2/3, plan #/dev).
export const DEV: boolean = import.meta.env.DEV || location.hostname.endsWith('vercel.app');
