var mainApp = angular.module("mainApp", ['chart.js','ngAnimate']);

mainApp.controller('myController', function($scope, $http) {
     $scope.showBoxOne = false;
     $scope.showErrors = false;
     $scope.newFunction = function(){
       $scope.apiUrl = 'https://api.lootbox.eu/pc/eu/'+$scope.username+'/profile';
       //$scope.apiUrl='profile.json';
       $scope.apiUrl = $scope.apiUrl.replace("#","-"); //Username in the get request must be sent with - instead of #.
       $scope.quickWin = "toDefine";
       $http.get($scope.apiUrl)
         .success(function(requestData) {
             console.log('joining the http request');
             if(requestData['error'] != undefined){
               return $scope.setEverything("nope");
             }
             console.log(requestData.data);
             $scope.dataUsername  = requestData.data.username;
             $scope.quickWin = requestData.data.games.quick.wins;
             $scope.level = requestData.data.level;
             $scope.competitiveWin = requestData.data.games.competitive.wins;
             $scope.competitiveLose = requestData.data.games.competitive.lost;
             $scope.competitiveRank = requestData.data.competitive.rank;
             $scope.labels = ["Vittorie", "Sconfitte"];
             $scope.colors = ['#FD1F5E','#1EF9A1'];
             $scope.options = {legend:
                                 {
                                     display: true
                                 }
                              };

             $scope.data = [$scope.competitiveWin, $scope.competitiveLose];
             return $scope.setEverything("ok");
         })
         .error(function(data) {
           alert('there were some errors');
         });


   }

   $scope.setEverything = function(status){
     if(status=='ok'){
       $scope.RankStyle = {
         'color' : null //inizializzazione colore
       };
       $scope.showBoxOne = true;
       $scope.RankStyle.color=$scope.switchRank($scope.competitiveRank);
       $scope.showErrors = false;
     }else{
       console.log("there were some errors");
       $scope.showErrors = true;
       $scope.errorUsername = $scope.username;
     }
   }

   $scope.switchRank = function(rank){
     var rankColor = {
       'bronze' : 'red',
       'silver' : 'grey',
       'gold' : 'yellow',
       'platinum' : 'white',
       'diamond' : 'lightblue',
       'master' :'todefine',
       'grandmaster' : 'todefine'
     };
     if(rank <= 1499)
       return rankColor['bronze'];
     else if(rank <= 1999)
       return rankColor['silver'];
     else if(rank <= 2499)
       return rankColor['gold'];
     else
       return 'green';//da rimuovere
     }

});


 // Elo: 1 - 1499 Bronze. 1500 - 1999 Silver. 2000 - 2499 Gold. 2500 - 2999 Platinum. 3000 - 3499 Diamond
 //3500 - 3999 Master. 4000+ Grandmaster
