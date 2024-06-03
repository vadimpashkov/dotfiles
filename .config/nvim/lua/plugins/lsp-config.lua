return {
	{
		"williamboman/mason.nvim",
		lazy = false,
		config = function()
			require("mason").setup()
		end,
	},
	{
		"williamboman/mason-lspconfig.nvim",
		lazy = false,
		opts = {
			auto_install = true,
		},
	},
	{
		"neovim/nvim-lspconfig",
		config = function()
			local capabilities = require("cmp_nvim_lsp").default_capabilities()
			local lspconfig = require("lspconfig")

			lspconfig.lua_ls.setup({
				capabilities = capabilities,
			})
			lspconfig.tsserver.setup({
				capabilities = capabilities,
			})
			lspconfig.html.setup({
				capabilities = capabilities,
			})

			vim.keymap.set("n", "<leader>ch", vim.lsp.buf.hover, { desc = "Показать подсказку" })
			vim.keymap.set(
				"n",
				"<leader>cd",
				vim.lsp.buf.definition,
				{ desc = "Перейти к определению" }
			)
			vim.keymap.set(
				"n",
				"<leader>ca",
				vim.lsp.buf.code_action,
				{ desc = "Совершить операцию над кодом" }
			)

			vim.keymap.set(
				"n",
				"<leader>cr",
				":Telescope lsp_references<CR>",
				{ desc = "Открыть список вызовов" }
			)

			vim.keymap.set(
				"n",
				"<leader>fsf",
				":Telescope lsp_document_symbols<CR>",
				{ desc = "Найти symbol в файле" }
			)
			vim.keymap.set(
				"n",
				"<leader>fsw",
				":Telescope lsp_dynamic_workspace_symbols<CR>",
				{ desc = "Найти symbol в проекте" }
			)

			vim.keymap.set(
				"n",
				"<leader>cR",
				vim.lsp.buf.rename,
				{ desc = "Переименовать символ (переменную/функцию и т.д.)" }
			)
		end,
	},
}
