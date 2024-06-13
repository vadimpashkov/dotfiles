return {
	"terrortylor/nvim-comment",
	config = function()
		require("nvim_comment").setup()

		vim.keymap.set(
			"n",
			"<leader>/",
			":CommentToggle<CR>",
			{ desc = "Закомментировать строку" }
		)
		vim.keymap.set(
			"v",
			"<leader>/",
			":CommentToggle<CR>",
			{ desc = "Закомментировать выделенный код" }
		)
	end,
}
