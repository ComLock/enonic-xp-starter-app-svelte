import 'es6-shim'; // Map Set for svelte
//import safeStringify from 'fast-safe-stringify';

//import {toStr} from '/lib/enonic/util';
import {getResource, readText} from '/lib/xp/io';
import App from './bundle';

export function get() {
  const obj = App.render({name: 'World'});
  //log.info(safeStringify({obj}));

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
  ${obj.html}
</body>
</html>`;
  return {
    contentType: 'text/html;charset=utf-8',
    body: htmlStr
  }
}
