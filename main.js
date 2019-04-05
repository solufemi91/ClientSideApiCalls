import returnString from './other.js';

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    results:[]
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      return this.message
    }
  },

  methods: {
     load() {
      var self = this
      var returnedString = returnString()
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var postcodeResults = JSON.parse(xhr.response).result
          for(var i in postcodeResults){
            self.results.push(postcodeResults[i].result.ccg)
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
