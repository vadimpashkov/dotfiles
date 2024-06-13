import esbuild from 'esbuild';
import alias from 'esbuild-plugin-alias';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const binDir = path.resolve(__dirname, '..', 'src', 'bin');
const entryPoints = fs
	.readdirSync(binDir)
	.filter((file) => file.endsWith('.ts'))
	.map((file) => path.join(binDir, file));

esbuild
	.build({
		entryPoints: entryPoints,
		outdir: 'dist',
		bundle: true,
		platform: 'node',
		external: ['commander', 'inquirer', 'colorjs.io'],
		sourcemap: true,
		minify: true,
		target: ['node20'],
		format: 'esm',
		banner: { js: '#!/usr/bin/env node' },
		plugins: [
			alias({
				'@commands': path.resolve(__dirname, '..', 'src', 'commands', 'index.ts'),
				'@utils': path.resolve(__dirname, '..', 'src', 'utils', 'index.ts'),
				'@localization': path.resolve(__dirname, '..', 'src', 'localization', 'index.ts'),
			}),
		],
	})
	.then(() => {
		const distDir = path.resolve(__dirname, '..', 'dist');

		fs.readdir(distDir, (err, files) => {
			if (err) {
				console.error('Error reading dist directory:', err);
				process.exit(1);
			}

			files.forEach((file) => {
				if (!file.endsWith('.js')) {
					return;
				}

				const filePath = path.join(distDir, file);

				fs.chmod(filePath, '755', (err) => {
					if (err) {
						console.error(`Error setting executable permission on ${file}:`, err);
						process.exit(1);
					}
					console.log(`Set executable permission on ${file}`);
				});
			});
		});

		console.log('Build completed!');
	})
	.catch(() => process.exit(1));
