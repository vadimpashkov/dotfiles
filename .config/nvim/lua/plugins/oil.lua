return {
	"stevearc/oil.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	config = function()
		require("oil").setup({
			float = {
				max_width = 50,
			},
			keymaps = {
				["<Esc>"] = "actions.close",
				["l"] = "actions.select",
				["h"] = "actions.parent",
				["."] = "actions.toggle_hidden",
			},
			view_options = {
				show_hidden = true,
			},
		})

		vim.keymap.set(
			"n",
			"<leader>e",
			"<CMD>Oil --float<CR>",
			{ desc = "Открыть панель навигации" }
		)
	end,
}
