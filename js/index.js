
var mainFrame = new Vue({
	el: "#mainFragme",
	data: {
		selectedFrame: "ingredient.html"
	}
})

var realEstateMenu = new Vue({
  el: '#realEstateMenu',
  data: {
      ingredientTabIsActive: true,
      examplesTabIsActive: false
  },
  methods: {
    clickToIngredientsTab: function () {
      unactiveAllTab()
      this.ingredientTabIsActive = true
      mainFrame.selectedFrame = "ingredient.html";
    },
    clickToExamplesTab: function () {
      unactiveAllTab()
      this.examplesTabIsActive = true
      mainFrame.selectedFrame = "example.html";
    }
  }
})

function unactiveAllTab() {
  realEstateMenu.ingredientTabIsActive = false
  realEstateMenu.examplesTabIsActive = false
}