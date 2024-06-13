-- Назначаем Space как <leader>
vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- Выход из INSERT мода
vim.keymap.set('i', 'jj', '<Esc>')
-- Тоже самое делаем и для русского языка, ибо Vim не умеет работать с кириллицей
vim.keymap.set('i', 'оо', '<Esc>')

-- Сохранить изменения в файле  
vim.keymap.set("n", "<leader>w", ":w<CR>", { desc = "Сохранить файл" })vim.keymap.set("n", "<leader>w", "<cmd>w<CR>", { desc = "Сохранить" })
vim.keymap.set("n", "<leader>q", ":bd<CR>", { desc = "Закрыть файл" })
