var ingredientsTable = new Vue({
  el: "#ingredientsTable",
  data: {
    ingredients: [],
    page: 1,
    totalPage: 1,
    paginationFirstPage: false,
    paginationLastPage: false,
    paginationPages: []
  },
  methods: {
    updatePaginationTabs: function() {
      console.log(ingredients.size);
    },
    changePage: function(page) {
      loadIngredients(page);
    },
    nextPage: function() {
      if (this.page!=this.totalPage) {
        loadIngredients(this.page+1);
      }
    },
    previousPage: function() {
      if (this.page!=1) {
        loadIngredients(this.page-1);
      }
    }
  }
})

var toolsPanel = new Vue({
  el: "#toolsPanel",
  methods: {
    addIngredient: function() {
      addIngredientModal.isActive = true
    },
    refreshList: function() {
      loadIngredients();
    }
  }
})

var addIngredientModal = new Vue({
  el: "#addIngredientModal",
  data: {
    isActive: false,
    name: "",
    fats: 0,
    squirrels: 0,
    carbohydrates: 0
  },
  methods: {
    addIngredient: function() {
      axios.post('http://127.0.0.1:8080/ingredient', {
        name: this.name,
        squirrels: this.squirrels,
        fats: this.fats,
        carbohydrates: this.carbohydrates,
        visibleType: 0,
        ownerId: -1
      }).then(function(response) {
        loadIngredients(ingredientsTable.page);
        addIngredientModal.isActive = false;
      });
    }
  }
})

function loadIngredients(page) {
  var offset = (page-1)*10;
  axios.get('http://127.0.0.1:8080/ingredient', {
    params: {
      offset: offset
    }
  }).then(function(response) {
    ingredientsTable.page = page;
    ingredientsTable.ingredients = response.data.list;
    updatePaginationTabs(page, Math.ceil(response.data.total/10));
  });
}

function updatePaginationTabs(page, totalPage) {
  console.log(page);
  console.log(totalPage);
  ingredientsTable.totalPage = totalPage;

  if (totalPage<=10){
    var result = [];
    for (var i = 1; i < totalPage+1; i++) {
      result.push({
        page: i,
        active: page==i
      });
    }
    ingredientsTable.paginationPages = result;
    ingredientsTable.paginationFirstPage = false;
    ingredientsTable.paginationLastPage = false;
    console.log(result);
  } else if (page<=4) {
    var result = [];
    for (var i = 1; i < 6; i++) {
      result.push({
        page: i,
        active: page==i
      });
    }
    ingredientsTable.paginationPages = result;
    ingredientsTable.paginationFirstPage = false;
    ingredientsTable.paginationLastPage = true;
  } else if (page>=totalPage-4) {
    var result = [];
    for (var i = totalPage-5; i < totalPage+1; i++) {
      result.push({
        page: i,
        active: page==i
      });
    }
    ingredientsTable.paginationPages = result;
    ingredientsTable.paginationFirstPage = true;
    ingredientsTable.paginationLastPage = false;
  } else {
    ingredientsTable.paginationPages = [
      {
        page: page-1,
        active: false
      },
      {
        page: page,
        active: true
      },
      {
        page: page+1,
        active: false
      }];
    ingredientsTable.paginationFirstPage = true;
    ingredientsTable.paginationLastPage = true;
  }
}

loadIngredients(1);
