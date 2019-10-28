app.service('LSService', function (localStorageService) {

    this.getLength = function () {
        return localStorageService.length();
    };

    this.getAllIDs = function () {
        return localStorageService.keys();
    };

    this.getTitle = function (key) {
        return localStorageService.get(key);
    };

    this.set = function (key, value) {
        return localStorageService.set(key, value)
    };

    /*this.isSupport = function () {
        return localStorageService.isSupported();
    };

    this.setPrefix = function () {
        app.config(function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('muzi');
        });
        
    };*/

    /*this.set = function (key, value) {
        return localStorageService.set(key, value)
    }*/
});