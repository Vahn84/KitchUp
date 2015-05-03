angular.module('starter.services', [])

.factory('AuthService', function($rootScope) {

  var loggedIn=false;

  return {

    checkLogin : function() {
      $rootScope.$broadcast('loggedIn', { 'loggedIn' : loggedIn });
      return loggedIn;

    },
    
    login : function() {
      loggedIn = true;
      $rootScope.$broadcast('loggedIn', { 'loggedIn' : loggedIn });
    }  

  }

})

.factory('Prodotto', function($resource) {
  return $resource('http://www.breakingweb.it/kitchup/v1/product/:barcode');
})

.factory('MyKitchen', function($resource) {
  return $resource('http://www.breakingweb.it/kitchup/v1/mykitchen/:id');
});