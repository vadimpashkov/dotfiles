import { Command } from "commander";

import { addTheme } from "./actions";
import { checkConfigExists } from "./utils";

export function addThemeCommand() {
  const command = new Command("add");

  command
    .description("Add theme to config file")
    .argument("<theme-name>", "Theme name")
    .action(async (theme) => {
      if (!checkConfigExists()) {
        return;
      }

      await addTheme(theme);
    });

  return command;
}
