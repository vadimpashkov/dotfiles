-- Отображаем номерацию строк
vim.opt.number = true
-- Делаем нумерацию относительно текущей строки
vim.opt.relativenumber = true

vim.opt.shell = "/bin/zsh"

-- Включаем мышь
vim.opt.mouse = "a"
vim.opt.mousefocus = true

-- Назначем общий буфер
vim.opt.clipboard = "unnamedplus"

-- Отключение переноса строк
vim.opt.wrap = false

-- Отображение табов как 2 пробела
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2

-- При нажатии на Tab будет вставляться табуляция (а не 2 пробела)
vim.opt.expandtab = false

-- Сохраняем файл, если изменили фокус
-- vim.api.nvim_create_autocmd("FocusLost", {
-- 	pattern = "*",
-- 	command = "silent! wa",
-- })
