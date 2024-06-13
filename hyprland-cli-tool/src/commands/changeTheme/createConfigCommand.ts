import { Command } from "commander";

import { createConfig } from "./actions";
import { checkConfigExists } from "./utils";

export function createConfigCommand() {
  const command = new Command("create-config");

  command.description("Create config").action(async () => {
    if (!checkConfigExists()) {
      return;
    }

    await createConfig();
  });

  return command;
}
