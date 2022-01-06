import 'es6-shim'; // Map Set for svelte
//import safeStringify from 'fast-safe-stringify';

import {toStr} from '/lib/enonic/util';
import {getResource, readText} from '/lib/xp/io';
import App from './ssr';


export function get() {
  const model = {name: 'World'};
  const obj = App.render(model);
  log.info(toStr({obj}));

  //const svelte = readText(getResource('/site/pages/svelte/svelte.svelte').getStream());
  const clientside = readText(getResource('/site/pages/svelte/clientside.js').getStream());

  const htmlStr = `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf8'>
  <meta name='viewport' content='width=device-width'>
  <title>Svelte app</title>
  <style>
    ${obj.css.code}
  </style>
</head>
<body>
  <main id="server-rendered-html">
    ${obj.html}
  </main>
  <script>
    ${clientside}
    new window.App({
      hydrate: true,
	    props: ${JSON.stringify(model)},
      target: document.querySelector('#server-rendered-html')
    });
  </script>
</body>
</html>`;
  return {
    contentType: 'text/html;charset=utf-8',
    body: htmlStr
  }
}
