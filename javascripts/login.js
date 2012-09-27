define(['jquery', 'underscore', 'knockout', 'parse'], function ($, under, ko, parse) {
	var loginVM = {
		ViewModel : function () {
			var self = this;

			self.username = ko.observable("");
			self.email = ko.observable("");
			self.password = ko.observable("");
			self.confirm_password = ko.observable("");
			self.errorMessage= ko.observable("");
			self.displayName = ko.observable("");
			self.isLoggedIn = ko.observable(false);


			self.initialize = function(){
				if(Parse.User.current()){
					self.displayName(Parse.User.current().get('username'));
					self.isLoggedIn(true);
				}

				$('#loginModal').on('hide', function () {
					self.reset();
				});
			};

			self.toggleView = function () {
				$('.register_view').toggle();
				$('.login_view').toggle();
			};



			self.logout = function(){
				Parse.User.logOut();
				self.displayName('');
				self.isLoggedIn(false);
			};

			self.login = function () {
				self.clearMessages();
				var user = Parse.User.logIn(self.username(), self.password(), {
					success : function (u) {
						self.displayName(u.get('username'));
						self.isLoggedIn(true);
						self.displayMessage("success", 'alert-success');
						setTimeout(function() {
							self.close();
						},300);
					},
					error: function(u, err){
						self.displayMessage(err.message, 'alert-error');
						console.log("error: " + JSON.stringify(err));
						console.log("user: " + u);
					}
				});
			};


			self.register = function () {
				self.clearMessages();

				if(!self.validate()) return;

				var user = new Parse.User({
					username: this.username(),
					email: this.email(),
					password: this.password()
				});

				user.signUp(null, {
					success: function(u){
						self.displayName(u.get('username'));
						self.isLoggedIn(true);
						self.displayMessage("success", 'alert-success');
						setTimeout(function() {
							self.close();
						},300);
					},
					error: function(u, err){
						self.displayMessage(err.message, 'alert-error');
						console.log("error: " + JSON.stringify(err));
						console.log("user: " + u);
					}
				});
			};

			self.forgotPassword = function () {
				self.displayMessage('not implemented', 'alert-info')
			};

			self.close = function() {
				$('#loginModal').modal('hide');
			};

			self.validate = function() {
				return true;
			};

			self.displayMessage = function(msg, klass){
				var html =
					'<div style="margin: 6px 0;" class="alert '+ klass + '">' +
						'<button type="button" class="close" data-dismiss="alert">×</button>' +
						'<div>'+ msg +'</div>' +
					'</div>';
				$('#loginModal .modal-header').append(html);
			};

			self.clearMessages = function() {
				var alerts = $('#loginModal .modal-header .alert');
				if(alerts.length>0){
					alerts.alert('close');
				}
			};

			self.reset = function() {
				self.clearMessages();
				self.username("");
				self.email("");
				self.password("");
				self.confirm_password("");

			};

			self.initialize();
		}
	};
	return loginVM;
});

