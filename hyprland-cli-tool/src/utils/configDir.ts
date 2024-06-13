import path from "path";
import fs from "fs";

import { getHomeDir } from "./getHomeDir";

export const configDir = path.join(getHomeDir(), ".config", "HyprlandCLITools");

export function ensureConfigDirExists() {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
}
