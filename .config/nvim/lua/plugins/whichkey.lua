return {
	"folke/which-key.nvim",
	config = function()
		local wk = require("which-key")

		wk.setup()

		wk.register({
			f = { name = "Найти" },
			o = { name = "Открыть" },
			g = { name = "Git" },
			c = { name = "Работа с кодом" },
		}, { prefix = "<leader>" })
	end,
}
