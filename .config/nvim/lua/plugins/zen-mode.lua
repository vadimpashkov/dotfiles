return {
	{
		"folke/twilight.nvim",
		config = function()
			vim.keymap.set("n", "<leader>zt", ":Twilight<CR>", { desc = "Включить/выключить Twiling" })
		end,
	},
	{
		"folke/zen-mode.nvim",
		config = function()
			require("zen-mode").setup({
				window = {
					backdrop = 1,
					width = 1,
				},
				plugins = {
					twilight = { enabled = true },
					gitsigns = { enabled = true },
					tmux = { enabled = true },
					kitty = {
						enabled = true,
						font = "+4",
					},
				},
			})

			vim.keymap.set("n", "<leader>zz", ":ZenMode<CR>", { desc = "Включить/выключить Zen Mode" })
		end,
	},
}
