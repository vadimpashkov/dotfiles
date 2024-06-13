import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import packageJson from "../package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const globalBinPath = "/usr/local/bin";

(async () => {
	try {
		const newBinEntries = packageJson.bin;
		const existingLinks = await fs.readdir(globalBinPath);
		const projectLinks = Object.keys(newBinEntries);

		for (const link of existingLinks) {
			if (!projectLinks.includes(link)) {
				try {
					const linkPath = path.join(globalBinPath, link);
					const stats = await fs.lstat(linkPath);
					if (stats.isSymbolicLink()) {
						await fs.unlink(linkPath);
						console.log(`Удален неиспользуемый симлинк: ${link}`);
					}
				} catch (unlinkError) {
					console.error(`Ошибка при удалении симлинка ${link}:`, unlinkError);
				}
			}
		}

		for (const command in newBinEntries) {
			if (newBinEntries.hasOwnProperty(command)) {
				const srcFilePath = path.resolve(
					__dirname,
					"../",
					newBinEntries[command],
				);
				const destLinkPath = path.join(globalBinPath, command);

				try {
					try {
						await fs.unlink(destLinkPath);
						console.log(`Старый симлинк удален для команды ${command}`);
					} catch (unlinkError) {
						if (unlinkError.code !== "ENOENT") {
							throw unlinkError;
						}
					}

					const stats = await fs.lstat(srcFilePath);
					if (stats.isFile()) {
						const linkCommand = `ln -sf ${srcFilePath} ${destLinkPath}`;
						execSync(linkCommand, { stdio: "inherit" });
						console.log(`Симлинк создан для команды ${command}`);
					}
				} catch (error) {
					console.error(
						`Ошибка при создании символической ссылки для команды ${command}:`,
						error,
					);
				}
			}
		}
	} catch (err) {
		console.error("Ошибка при выполнении скрипта:", err);
	}
})();
