return {
	"rcarriga/nvim-notify",
	config = function()
		require("notify").setup({
			stages = "fade",
			timeout = 2000,
			max_width = 20,
			top_down = false,
		})
	end,
}
