return {
	"stevearc/oil.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	config = function()
		require("oil").setup({
			keymaps = {
				["<Esc>"] = "actions.close",
				["l"] = "actions.select",
				["h"] = "actions.parent",
				["."] = "actions.toggle_hidden",
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
