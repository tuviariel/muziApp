app.controller('mainController', function ($scope, LSService, RecipeAPIService) {

    // -- Displays localStorage of saved favorite recipes (on load):
    $scope.amount = LSService.getLength();
    $scope.favorites_rid = [];
    if ($scope.amount !== 0) {
        
        $scope.favorites_title = [];
        $scope.favorites_rid = LSService.getAllIDs();
        
        for (var i = 0; i < $scope.favorites_rid.length; i++) {
            var rtitle = LSService.getTitle($scope.favorites_rid[i]);
            $scope.favorites_title.push(rtitle);
        };
    };
    

    //-- Displays 30 most popular recipes (on load):
    $scope.mainBrowse = true;
    $scope.titles = "Our Most Popular recipes:";
    RecipeAPIService.getAll()
        .then(function (response) {
            if (response.data.count == "-1") {
                $scope.messages = "Something Went Wrong...";
            }
            else if (response.data.error == "limit") {
                $scope.messages = "You have reached the limit of API requests for today.";
            }
            else {
                $scope.recipes = response.data.recipes;
            };
        });



    // -- Search for Recipe by name:
    $scope.mySearch = function () {
        if ($scope.search == "") {
            $scope.titles = "";
            $scope.messages = "Seems like you forgot to write your request..";
        }
        else {
            /* --to search by more than one Ingredient must add commas: --
            var string = $scope.searchIngredients;
            var query = string.replace(/ /g, ","); **/

            RecipeAPIService.getSearch($scope.search)
                .then(function (response) {
                    if (response.data.count == "-1") {
                        $scope.messages = "Something Went Wrong...";
                    }
                    else if (response.data.error == "limit") {
                        $scope.messages = "You have reached the limit of API requests for today..";
                    }
                    else if (response.data.count == "0") {
                        $scope.messages = "No Recipes Found for '" + $scope.search + "'.";
                    }
                    else {
                        $scope.messages = "";
                        $scope.titles = "Search Results for '" + $scope.search + "':";
                        $scope.searchResult = true;
                        $scope.mainBrowse = false;
                        $scope.favoriteRecipe = false;
                        $scope.searchRecipes = response.data.recipes;
                    };
                });
        };
    };


    // -- Save recipe to Favorites Local Storage and array: --
    $scope.saveFavorites = function (rtitle, rurl) {
        var locateID = rurl.indexOf("view/");
        var rID = rurl.slice(locateID + 5);        
        if ($scope.favorites_rid.indexOf(rID) > -1) {
            alert("The Recipe " + rtitle + " is already in your Favorites list.");
        }
        else {
            LSService.set(rID, rtitle);
            $scope.amount = LSService.getLength();
            $scope.favorites_title.push(rtitle);
            $scope.favorites_rid.push(rID);
            alert("The Recipe " + rtitle + " was added successfully to you favorites list.");
        };
    };

    // -- showing list of Browsed Recipes only: --
    $scope.home = function () {
        if ($scope.searchResult == true) {
            $scope.searchResult = false;

        }
        if ($scope.favoriteRecipe == true) {
            $scope.favoriteRecipe = false;
        }
        if ($scope.mainBrowse == false) {
            $scope.mainBrowse = true;
        }
        $scope.messages = "";
        $scope.titles = "Our Most Popular recipes:";
    };


    // -- Favorite Recipes Show: --
    $scope.selectedRecipe = "";
    $scope.myFavorites = function () {
        if ($scope.amount == 0) {
            $scope.messages = "Seems like you haven't saved Recipes to the list yet...";
        }
        else if ($scope.selectedRecipe == "") {
            $scope.messages = "Pick a Recipe you'd like to see...";
        }
        else {
            $scope.searchResult = false;
            $scope.mainBrowse = false;
            var i = $scope.favorites_title.indexOf($scope.selectedRecipe);

            RecipeAPIService.getByID($scope.favorites_rid[i])
                .then(function (response) {
                    if (response.data == "-1") {
                        $scope.messages = "Something Went Wrong...";
                    }
                    else if (response.data.error == "limit") {
                        $scope.messages = "You have reached the limit of API requests for today..";
                    }
                    else {

                        $scope.ima = response.data.recipe.image_url;
                        $scope.sou = response.data.recipe.source_url;
                        $scope.f2f = response.data.recipe.f2f_url;
                        $scope.tit = response.data.recipe.title;
                        $scope.pub = response.data.recipe.publisher;
                        $scope.pub_url = response.data.recipe.publisher_url;
                        $scope.soc = response.data.recipe.social_rank;

                        $scope.messages = $scope.tit;
                        $scope.titles = "One of Your Favorite Recipes:";
                        $scope.favoriteRecipe = true;
                        $scope.selectedRecipe = "";
                    };
                });
        };
    };
});