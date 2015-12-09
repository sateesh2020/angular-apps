(function(){

	'use strict';

	angular
		.module('formApp')
		.factory('formService', formService);

	function formService($http) {

		function getProvinces() {
			return [
			  {"name": "India","value":"india"},
			  {"name":"San Jose","value":"san_jose"},
			  {"name":"Sydney","value":"sydney"},
			  {"name":"New York","value":"new_york"},
			  {"name":"Melbourne","value":"melbourne"},
			  {"name":"Tokyo","value":"tokyo"},
			  {"name":"Beijing","value":"beijing"}
			];
    }

    function getUserDetails(){
      var request = {
        url:'/api/getCache',
        method:'GET'
      }
      return $http(request)
          .then(sendUserDetails)
          .catch(function(message){
            console.log(message);
          });
      function sendUserDetails(response){
        return response.data;
      }
    }

    function addOrUpdateUser(formData) {
      var request = {
        url:'/api/saveCache',
        method:'POST',
				data:formData
      }
      return $http(request)
          .then(sendUpdateResponse)
          .catch(function(message){
            console.log(message);
          })
      function sendUpdateResponse(response) {
        return response.data;
      }
    }

		function removeUser(formData) {
			var request = {
        url:'/api/removeCache',
        method:'DELETE',
				data:formData
      }
      return $http(request)
          .then(sendDeleteResponse)
          .catch(function(message){
            console.log(message);
          })
      function sendDeleteResponse(response) {
        return response.data;
      }
		}


		return {
			getProvinces: getProvinces,
      addOrUpdateUser:addOrUpdateUser,
      getUserDetails:getUserDetails,
			removeUser:removeUser
		}
	}
})();
