angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $state.go('app.mykitchup');
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('PlaylistsCtrl', function($scope, $stateParams) {
	
	
})

.controller('ListaSpesaCtrl', function($ionicModal, $ionicPlatform, $scope, $rootScope, Prodotto, MyKitchen, $cordovaBarcodeScanner, $cordovaDatePicker) {
	
	$scope.postData = {};
	$scope.kitchupData = {};
	$scope.form = {};
	$scope.prodotti = [];
	$scope.kitchupData.fk_id_kitchen=1;
	
	$scope.listaMisure = [
     { id: 1, name: 'grammi' },
     { id: 2, name: 'pezzi' }
   ];
   
   $scope.listaCategorie = [
     { id: 1, name: 'verdura' },
     { id: 2, name: 'carne' },
	 { id: 3, name: 'frutta' },
	 { id: 4, name: 'legumi' }
   ];
	
	$scope.postData.preconfezionatoBoolean = true;
	$scope.kitchupData.listaSpesaSiNoBoolean = true;
	
	var currentStart = 0;
	var productAlreadyExist = false;
	
	$scope.postData.barcode = 000;
	
	$ionicModal.fromTemplateUrl('templates/addproduct.html', {
		scope: $scope
	}).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.scanBarcode = function() {
	  
	 if($scope.postData.barcode=="" || $scope.postData.barcode==undefined){
		 
        $cordovaBarcodeScanner.scan().then(function(imageData) {
		      $scope.postData.barcode = imageData.text;
			  $scope.postData.tipo_barcode = imageData.format;
			  
			  Prodotto.get({barcode: imageData.text}, function(response) {
			   if(response.id!=null){
				   $scope.postData = response;
					console.log(response.nome);
					console.log($scope.postData.nome);
					productAlreadyExist = true;
			   }
			   
			   else {
				   productAlreadyExist = false;
			   }
			   
			});
			  
			  
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
		
		
  }
  
  else {
	  
	    Prodotto.get({barcode: $scope.postData.barcode}, function(response) {
			   if(response.id!=null){
				   $scope.postData = response;
					console.log(response.nome);
					console.log($scope.postData.nome);
					productAlreadyExist = true;
			   }
			   
			   else {
				   productAlreadyExist = false;
			   }
			   
			});
	  
	  
	  	  
  }
		
    };
  

  // Triggered in the login modal to close it
  $scope.insertProdotto = function() {
		//$scope.prodotto = Prodotto.get();
	//console.log($scope.prodotto);  
	 
	if(!productAlreadyExist){
	console.log("prodotto non esistente");
     Prodotto.save({}, $scope.postData, saveSuccess(postProdotto), saveError);
	}
	
	else {
		if($scope.postData.preconfezionato_si_no==1) {$scope.postData.preconfezionatoBoolean= true; } else {$scope.postData.preconfezionatoBoolean==false;}
		$scope.modal.hide();
		$scope.giveKitchupDataToPostData();
		
		$scope.addItem($scope.postData);
	
	}
	
	function saveSuccess (postProdotto){
		console.log("prodotto inserito correttamente!")
		$scope.modal.hide();
		$scope.giveKitchupDataToPostData();
		$scope.postData.id = postProdotto.prodotto.id;
		$scope.addItem($scope.postData);
		
		
	}
	
	function saveError (){
		console.log("Errore durante l'inserimento!")
		
	}
	

  };
  
  $scope.giveKitchupDataToPostData = function() {
	  $scope.postData.kitchupData = $scope.kitchupData;
	  
  };
  
  $scope.saveKitchupProductData = function() {
 	 
	 MyKitchen.save({}, $scope.kitchupData);
	  
  };
  
  
  $scope.addItem = function(item) {
	  
	   $scope.prodotti.push(item);
  
  }
  

  // Open the login modal
  $scope.addProduct = function() {
    $scope.modal.show();
  };
  	
  // Triggered in the login modal to close it
  $scope.closeAddProduct = function() {
    $scope.modal.hide();
  };
	
	
	 // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
	  
	  console.log($scope.form.addProduct.$dirty);
    if($scope.form.addProduct.$dirty){
		$scope.form.addProduct.$setPristine();
	   }
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
	   console.log($scope.form.addProduct.$dirty);
   if($scope.form.addProduct.$dirty){
		$scope.form.addProduct.$setPristine();
	   }
  });
  
 
  var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: true,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };
  
$scope.showDatePicker = function(options){

  $cordovaDatePicker.show(options).then(function(date){
		$scope.postData.data_scadenza = date;
    });
};
  
	
});
