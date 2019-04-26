import {getResource, readText} from '/lib/xp/io';

export function get() {
  var css = readText(getResource('/site/pages/svelte/bundle.css').getStream());
  var js = readText(getResource('/site/pages/svelte/bundle.js').getStream());
  return {
    contentType: 'text/html;charset=utf-8',
    body: `<!doctype html>
<html>
  <head>
    <meta charset='utf8'>
    <meta name='viewport' content='width=device-width'>
    <title>Svelte app</title>
  	<style type="text/css">
      ${css}
    </style>
  </head>
  <body>
  	<script type="text/javascript">
      ${js}
      new window.App({
        target: document.body,
	       props: {
           name: 'world'
         }
       });
     </script>
  </body>
</html>`
  }
}
