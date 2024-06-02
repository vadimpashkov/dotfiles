return {
	"mistricky/codesnap.nvim",
	build = "make",
	config = function()
		require("codesnap").setup({
			save_path = "~/Pictures/CodeSnap",
			has_breadcrumbs = false,
			has_workspace = false,
			has_line_number = true,
			mac_window_bar = false,
			code_font_family = "JetBrainsMono Nerd Font",
			bg_theme = "dusk",
			watermark = ""
		})

		vim.keymap.set(
			"x",
			"<leader>cc",
			":CodeSnap<CR>",
			{ desc = "Сохранить выделенный код в буфер" }
		)
		vim.keymap.set(
			"x",
			"<leader>cs",
			":CodeSnapSave<CR>",
			{ desc = "Сохранить выделенный код в папку" }
		)
	end,
}
