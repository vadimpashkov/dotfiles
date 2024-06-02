return {
	{
		"nvim-telescope/telescope-ui-select.nvim",
	},
	{
		"nvim-telescope/telescope.nvim",
		tag = "0.1.6",
		dependencies = { "nvim-lua/plenary.nvim" },
		config = function()
			require("telescope").setup({
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown({}),
					},
				},
			})

			local builtin = require("telescope.builtin")

			vim.keymap.set("n", "<leader>ff", builtin.find_files, { desc = "Найти файл" })
			vim.keymap.set(
				"n",
				"<leader>fg",
				builtin.live_grep,
				{ desc = "Глобальный поиск текста (grep)" }
			)

			vim.keymap.set("n", "<leader>ob", builtin.buffers, { desc = "Открыть вкладку (buffer)" })
			vim.keymap.set("n", "<leader>oh", builtin.help_tags, { desc = "Открыть инструкцию" })
			vim.keymap.set("n", "<leader><leader>", builtin.oldfiles, {})

			require("telescope").load_extension("ui-select")
		end,
	},
}