return {
	"sindrets/diffview.nvim",
	lazy = false,
	config = function()
		vim.keymap.set("n", "<leader>gdc", ":DiffviewClose<CR>", { desc = "Закрыть разницу Git" })
		vim.keymap.set("n", "<leader>gdo", ":DiffviewOpen<CR>", { desc = "Открыть разницу Git" })
	end,
}
