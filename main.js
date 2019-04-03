var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    results:[]
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      this.load()
      return this.message
    }
  },

  methods: {
     load() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var test = JSON.parse(xhr.response).result
          for(var t in test){
            app._data.results.push(test[t].result.ccg)
          }
        }
      }

      xhr.open('POST', "https://postcodes.io/postcodes", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      var data = JSON.stringify({"postcodes" : ["OX49 5NU", "M32 0JG", "NE30 1DP"]});
      xhr.send(data);
    }
  }
})
