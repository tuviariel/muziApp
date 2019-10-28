app.service('RecipeAPIService', function ($http) {

    var baseUrl = "https://www.food2fork.com/api/";
    //var key = "?key=6e6938e04beaf4e89bde22ac4560de88";
    var key = "?key=456e32249e01e52ef1b28aaf9ae56c32";
    var s = "search";
    var g = "get";

    this.getAll = function () {
            return $http.get(baseUrl + s + key);
    };

    this.getSearch = function (query) {
        return $http.get(baseUrl + s + key + "&q=" + query + "&sort=r");
    };

    this.getByID = function (rID) {
        return $http.get(baseUrl + g + key + "&rId=" + rID);
    };
});

// the key from jewishescr@gmail.com- 6e6938e04beaf4e89bde22ac4560de88
// the key from tuviadiora@gmail.com- 456e32249e01e52ef1b28aaf9ae56c32
