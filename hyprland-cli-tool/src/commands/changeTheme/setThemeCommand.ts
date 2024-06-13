import { Command } from "commander";

import { setTheme } from "./actions";
import { checkConfigExists } from "./utils";
import { getThemeSetSuccessText } from "./define";

export function setThemeCommand() {
  const command = new Command("set");

  command
    .description("Set theme")
    .argument("[theme-name]", "Theme name", "Default")
    .action(async (theme) => {
      if (!checkConfigExists()) {
        return;
      }

      await setTheme(theme);

      console.log(getThemeSetSuccessText(theme));
    });

  return command;
}
