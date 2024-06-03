return {
	"folke/todo-comments.nvim",
	dependencies = { "nvim-lua/plenary.nvim" },
	lazy = false,
	opts = {
		keywords = {
			FIX = {
				icon = " ",
				color = "error",
				alt = { "FIXME", "BUG", "FIXIT", "ISSUE" },
			},
			TODO = { icon = " ", color = "info" },
			HACK = { icon = " ", color = "warning" },
			WARN = { icon = " ", color = "warning", alt = { "WARNING", "XXX" } },
			NOTE = { icon = " ", color = "hint", alt = { "INFO", "REMARK" } },
		},
	},
	config = function()
		local todo_comments = require("todo-comments")

		todo_comments.setup()

		vim.keymap.set("n", "<leader>ot", ":TodoTelescope<CR>", { desc = "Открыть список TODO" })

		vim.keymap.set(
			"n",
			"]t",
			todo_comments.jump_next,
			{ desc = "Перейти к следующему TODO комментарию" }
		)
		vim.keymap.set(
			"n",
			"[t",
			todo_comments.jump_prev,
			{ desc = "Перейти к предыдущему TODO комментарию" }
		)
	end,
}
