app.factory('forecast', ['$http', function($http) { 
  return $http.get('http://api.openweathermap.org/data/2.5/forecast?q=HongKong&mode=json&appid=2de143494c0b295cca9337e1e96b00e0') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
