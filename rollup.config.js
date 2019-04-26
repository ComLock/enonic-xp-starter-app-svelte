import glob from 'glob';
//import path from 'path';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

//const toStr = v => JSON.stringify(v, null, 4);

const PRODUCTION = !process.env.ROLLUP_WATCH;

const SRC_DIR = 'src/main/resources';
const DST_DIR = 'build/resources/main';

const SVELTE_FILES = glob.sync(SRC_DIR + '/**/*.svelte');
//console.log(`SVELTE_FILES:${toStr(SVELTE_FILES)}`);

const CONFIG_ARRAY = SVELTE_FILES.map(input => {
  //const DST_PATH = DST_DIR + input.replace(SRC_DIR, '').replace(/\/[^\/]+$/, '');
  const DST_PATH = input.replace(/\/[^\/]+$/, '');
  //console.log(`DST_PATH:${toStr(DST_PATH)}`);
  //const NAME = '_' + input.replace(/.*\//, '').replace(/\.[^.]+$/, '');
  //console.log(`NAME:${toStr(NAME)}`);
  return {
    input,
    output: {
  		sourcemap: false,
  		//format: 'iife', // Browsers
      format: 'cjs', // Node
      //format: 'umd', // Browsers and Node
  		name: 'App',
  		//file: DST_PATH + '/' + NAME + '.js'
      file: DST_PATH + '/' + 'bundle' + '.es'
  	},
    plugins: [
  		svelte({
  			// enable run-time checks when not in production
  			dev: !PRODUCTION,
  			// we'll extract any component CSS out into
  			// a separate file — better for performance
  			/*css: css => {
  				//css.write(DST_PATH + '/' + NAME + '.css', false);
          css.write(DST_PATH + '/' + 'bundle' + '.css', false);
  			},*/
        generate: 'ssr' // as opposed to 'dom', the default
  		}),

  		// If you have external dependencies installed from
  		// npm, you'll most likely need these plugins. In
  		// some cases you'll need additional configuration —
  		// consult the documentation for details:
  		// https://github.com/rollup/rollup-plugin-commonjs
  		resolve(),
  		commonjs(),

  		// If we're building for production (npm run build
  		// instead of npm run dev), minify
  		PRODUCTION && terser()
  	]
  };
});
//console.log(`CONFIG_ARRAY:${toStr(CONFIG_ARRAY)}`);

export default CONFIG_ARRAY;
