// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	$cordovaStatusbar.styleHex('#9ed0cb');
	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  
  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/login.html',
      controller: 'AppCtrl'
    })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.mykitchup', {
      url: "/mykitchup",
      views: {
        'menuContent': {
          templateUrl: "templates/mykitchup.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
	
	
	.state('app.listaspesa', {
      url: "/listaspesa",
      views: {
        'menuContent': {
          templateUrl: "templates/listaspesa.html",
          controller: 'ListaSpesaCtrl'
        }
      }
    })
	
	

	
	.state('app.addproduct', {
      url: "/addproduct",
      views: {
        'menuContent': {
          templateUrl: "templates/addproduct.html",
          controller: 'BarcodeCtrl'
        }
      }
    })
	
	

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('sign-in');
});
