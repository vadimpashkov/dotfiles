import { Command } from 'commander';
import { setThemeCommand, addThemeCommand, createConfigCommand } from '@commands';

const program = new Command();

program.name('Hyprland CLI Tools - Theme Changer').version('0.1.0').description('Change theme to Hyprland');

program.addCommand(createConfigCommand());
program.addCommand(addThemeCommand());
program.addCommand(setThemeCommand());

program.parse(process.argv);
