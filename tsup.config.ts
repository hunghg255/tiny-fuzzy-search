import { defineConfig } from 'tsup';

export default defineConfig([
  {
		entry: ['src/index.ts'],
		format: ['esm', 'cjs'],
		dts: true,
		sourcemap: false,
		clean: true,
		platform: 'browser',
		target: 'es2022',
	}
]);
