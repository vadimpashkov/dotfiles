import fs from "fs";
import path from "path";

import { configDir } from "@utils";

import { Config } from "./types";
import { CONFIG_FILE_NAME, NOT_CONFIG_FILE_ERROR } from "./define";

export function getPathToConfig() {
  return path.join(configDir, CONFIG_FILE_NAME);
}

export function getConfig(): Config {
  return JSON.parse(fs.readFileSync(getPathToConfig(), "utf-8"));
}

export function checkConfigExists(): boolean {
  const configFilePath = getPathToConfig();

  if (!fs.existsSync(configFilePath)) {
    console.error(NOT_CONFIG_FILE_ERROR);
    return false;
  }

  return true;
}
