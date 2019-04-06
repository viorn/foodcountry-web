var ingredientsTable = new Vue({
  el: "#ingredientsTable",
  data: {
    ingredients: []
  }
})

var toolsPanel = new Vue({
  el: "#toolsPanel",
  methods: {
    refreshList: function() {
      loadAll()
    }
  }
})

function loadAll() {
  axios.get('http://127.0.0.1:8080/ingredient')
    .then(function(response) {
      ingredientsTable.ingredients = response.data.list;
    });
}

loadAll();
