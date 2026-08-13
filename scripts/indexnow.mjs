// Avisa a Bing/Yandex (IndexNow) que las URLs del sitemap cambiaron.
// Uso: node scripts/indexnow.mjs            → manda todo el sitemap
//      node scripts/indexnow.mjs /blog/x    → manda solo esas rutas
//
// La clave debe seguir siendo servible en https://1bite.studio/<KEY>.txt
// (archivo en public/). Si se rota la clave, rotar ambos.

const KEY = "85d4dbdf455547b1bbb07055c16a678b";
const HOST = "1bite.studio";
const SITE = `https://${HOST}`;

async function urlsDelSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml devolvió ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${SITE}${p}`))
  : await urlsDelSitemap();

if (!urlList.length) {
  console.error("Sin URLs que enviar.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// IndexNow responde 200 o 202 cuando acepta el lote.
console.log(`IndexNow: ${res.status} ${res.statusText} · ${urlList.length} URLs`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
