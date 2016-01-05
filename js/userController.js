/**
 * Created by ZC on 2015/12/30.
 */
(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('UserController', UserController);

    function UserController($http, baseUrl, $auth, $rootScope, $state) {

        var vm = this;

        vm.users;
        vm.error;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get(baseUrl + '/api/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
                console.log(error);
            });
        }

        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        vm.logout = function() {

            $auth.logout().then(function () {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

                // Redirect to auth (necessary for Satellizer 0.12.5+)
                $state.go('auth');
            });
        }
    }

})();