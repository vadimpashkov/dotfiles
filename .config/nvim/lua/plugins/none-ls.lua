return {
	"nvimtools/none-ls.nvim",
	config = function()
		local null_ls = require("null-ls")

		null_ls.setup({
			sources = {

				-- Lua
				null_ls.builtins.formatting.stylua,

				-- JavaScript
				null_ls.builtins.formatting.prettier,
			},
		})

		vim.keymap.set("n", "<leader>cf", vim.lsp.buf.format, { desc = "Отформатировать файл" })
	end,
}
