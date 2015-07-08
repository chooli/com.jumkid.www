(function($){
	
	$.JK.user = {};
	
	$.JK.user.reload = function(locale){
		window.location.href = $.JK.addParameterToURL(window.location.href, 'lang', locale);
	};

	$.JK.user.SignInWidget = function(settings){
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};
	$.JK.user.SignInWidget.prototype = $.extend(false, new $.JK.Widget(), {
		
	    id: "user-signin-wdg",

	    html: '<dummy>'+
				'<div class="user_signin_title"><h2>'+SYSLang.User+' '+SYSLang.Signin+'</h2></div>'+
				'<div class="user_info_input">'+
				  '<form id="signin_form" name="signin_form" action="sign-in" method="POST">'+
						'<label for="userId">'+SYSLang.UserName+'</label><input class="validate[required]" name="username" type="text" /><div class="di"></div>'+
						'<label for="password">'+SYSLang.Password+'</label><input class="validate[required]" name="password" type="password" action="login"  /><div class="di"></div>'+
						'<input type="hidden" name="_csrf"	value="'+$("meta[name='_csrf']").attr("content")+'"/>'+
						'<div style="float:right;margin-right:47px;"><a id="password_forget_btn" href="#">'+SYSLang.ForgetPassword+'</a><input type="submit" id="action_button_text" value="'+SYSLang.Signin+'" /></div>'+
						'<div class="di" style="margin:2px 16px 0px 68px;"><a id="user_signup_btn" href="#">'+SYSLang.Register+'</a></div>'+
				  '</form>'+
				'</div>'+
			'</dummy>',

		show: function(){
			$.JK.Widget.prototype.show.apply(this, arguments);
			var wdg = this;

			//bind event
			$('#user_signup_btn').bind('click', function(){
				var signUpWidget = new $.JK.user.SignUpWidget({
					targetDiv: $('#user_signup_panel')
				}).show();
			});
			
			$('#password_forget_btn').bind('click', function(){
				var findPwdWidget = new $.JK.user.FindPwdWidget({
					targetDiv: $('#user_signup_panel')
				}).show();
			});		
			
			
		},
		
		loadStore: function(){
			
	    	if(!$.JK.checkinProgress()) return;		  	    	
	    	$.JK.popup.showWaiting();	
			  
			$.ajax({  
		      type: "GET",
		      url: "user.json",
		      dataType: "json",
		      contentType: "application/x-www-form-urlencoded; charset=utf-8",
		      data: {
		      	act: "login",
		      	username: $('input#username').val(),
		      	password: $("input#password").val(),
		      	locale: $("#locale").val()
		      },
		      success: function(data, textStatus, request) {    	  		    	
		    	
	        	if(data.success){
	        		window.location = "home";
	        	}else{
	        		$.JK.showError($.JK.getLocalMessage(data.errors), 'login_error_msg');
	        	} 
	        	    
	        	$.JK.checkoutProgress();
	        	$.JK.popup.hideWaiting();
		      },
	          error: function(request, status, error){   
	        	  $.JK.checkoutProgress();
	        	  $.JK.popup.hideWaiting();
	        	  $.JK.showError(error, 'login_error_msg');
	          }  
		   });
	    },
	    
	    forgetPassword: function(){
	    	//TODO
	    	alert("not available yet");
	    }
	  
	});

	$.JK.user.SignUpWidget = function(settings){
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};
	$.JK.user.SignUpWidget.prototype = $.extend(false, new $.JK.Widget(), {

		id: "user-signup-wdg",

		html: '<dummy>'+
					'<div class="user_signin_title"><h2>'+SYSLang.User+' '+SYSLang.Signup+'</h2></div>'+
					'<div class="user_info_input" style="height: 320px;">'+
						'<form id="signup_form" name="signup_form" method="POST">'+
							'<div><label for="userId">'+SYSLang.UserName+'</label><input type="text" name="username" /></div>'+
							'<div><label for="fullName">'+SYSLang.NickName+'</label><input type="text" name="fullName" /></div>'+
							'<div><label for="email">'+SYSLang.Email+'</label><input type="text" name="email" /></div>'+
							'<div><label for="password">'+SYSLang.Password+'</label><input type="password" name="password" /></div>'+
							'<div><label for="cpassword">'+SYSLang.ConfirmPassword+'</label><input type="password" name="cpassword" /></div>'+
							'<div><label for="userRole">'+SYSLang.UserRole+'</label><div id="user-role-radios"></div></div>'+
							'<div id="signup_btn_panel" style="float:right; margin-right:47px;">'+
								'<input type="submit" value="'+SYSLang.Submit+'"/>'+
							'</div>'+
						'</form>'+

					'</div>'+
				'</dummy>',
		
		show: function(){
			$.JK.Widget.prototype.show.apply(this, arguments);
			var self = this;
			
			//init form validator
			$("#signup_form").validate({
				rules: {
					username: {
						required: true,
						remote: {
							type: "POST",
							url: $.JK.assembleUrl($.JK.API.USER.EXISTS),
							dataType: "json",
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							data: {
					          username: function() {
					            return $( "#signup_form input[name=username]" ).val();
					          }
					        }
						}
					},
					password: {
						required: true,
						minlength: 6
					},
					cpassword: {
						required: true,
						minlength: 6,
						equalTo: "#signup_form input[name=password]"
					},
					email: {
						required: true,
						email: true,
						remote: {
							type: "POST",
							url: $.JK.assembleUrl($.JK.API.USER.EMAIL_EXISTS),
							dataType: "json",
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							data: {
					          email: function() {
					            return $( "#signup_form input[name=email]" ).val();
					          }
					        }
						}
					}
                },
                messages: {
					username: {
						required: "✖",
						remote: SYSLang.UserNameExists
					},
					password: {
						required: "✖",
						minlength: SYSLang.PasswordInvalid
					},
					cpassword: {
						required: "✖",
						minlength: SYSLang.PasswordInvalid,
						equalTo: SYSLang.PasswordMismatched
					},
					email: {
						required: "✖",
						email: "✖",
						remote: SYSLang.EmailExists
					}
                },

                submitHandler: function() {
					self.signUp();
                }

            });
					
			
			//init communication options
			new $.JK.user.UserRoleRadios({
				targetDiv: $('#user-role-radios'),
				store:{options:[{id:0,name:"ROLE_USER", value:"user", title:SYSLang.Traveler, checked:"ROLE_USER"},
				                {id:0,name:"ROLE_AGENT", value:"agent", title:SYSLang.Agent,}]}
			}).show();
		},
		
		signUp: function(){
			var self = this;

			if(!$.JK.checkinProgress()) return;

			$('#signup_btn_panel').html('<img src="images/site/gray-loading.gif" height="23px"/>');
			
			$.ajax({
				type: "POST",
				url: $.JK.assembleUrl($.JK.API.USER.SIGNUP),
				dataType: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				data: $.JK.convertFormToJSON('signup_form'),
				success: function(data, textStatus, request) {

					if(data.success){
						$('#signin_form input[name=j_username]').val(data.user.username);
						$('#signup_btn_panel').html(SYSLang.RegisterSuccess);
					}

					$.JK.checkoutProgress();
					return self;

				},
				error: function(request, status, error){
					$.JK.checkoutProgress();
				}

			});
		}

	});
	
	$.JK.user.FindPwdWidget = function(settings){
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};
	$.JK.user.FindPwdWidget.prototype = $.extend(false, new $.JK.Widget(), {
		
		id: "find-pwd-wdg",

		html: '<dummy>'+
					'<div class="user_signin_title"><h2>'+SYSLang.ForgetPassword+'</h2></div>'+
					'<div class="user_info_input" style="height: 210px;">'+
						'<div style="margin-left:13px;">'+SYSLang.FindPwdByEmail+'</div>'+
						'<form id="find_pwd_form" name="find_pwd_form" method="POST">'+
							'<div><label for="email">'+SYSLang.Email+'</label><input type="text" name="email" /></div>'+
							'<div id="submit_btn_panel" style="float:right; margin: 18px 47px 0px 0px;">'+
								'<input type="submit" value="'+SYSLang.SendMePassword+'"/>'+
							'</div>'+
						'</form>'+

					'</div>'+
				'</dummy>',
				
		show: function(){
			$.JK.Widget.prototype.show.apply(this, arguments);
			var self = this;
			
			//init form validator
			$("#find_pwd_form").validate({
				rules: {
					email: {
						required: true,
						email: true,
						remote: {
							type: "POST",
							url: $.JK.assembleUrl($.JK.API.USER.EMAIL_NOT_EXISTS),
							dataType: "json",
							contentType: "application/x-www-form-urlencoded; charset=utf-8",
							data: {
					          email: function() {
					            return $( "#find_pwd_form input[name=email]" ).val();
					          }
					        }
						}
					}
                },
                messages: {
					email: {
						required: "✖",
						email: "✖",
						remote: SYSLang.EmailNotExists
					}
                },

                submitHandler: function() {
					self.findPwd();
                }

            });
			
		},
		
		findPwd: function(){
			var self = this;

			if(!$.JK.checkinProgress()) return;

			$('#submit_btn_panel').html('<img src="images/site/gray-loading.gif" height="23px"/>');
			
			$.ajax({
				type: "POST",
				url: $.JK.assembleUrl($.JK.API.USER.FIND_PWD),
				dataType: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				data: $.JK.convertFormToJSON('find_pwd_form'),
				success: function(data, textStatus, request) {

					if(data.success){
						$('#submit_btn_panel').html(SYSLang.MailHasSent);
					}

					$.JK.checkoutProgress();
					return self;

				},
				error: function(request, status, error){
					$.JK.checkoutProgress();
				}

			});
		}		
				
	});
	
	/**
	 * user roles radio group widget
	 */
	$.JK.user.UserRoleRadios = function(settings){		
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};
	$.JK.user.UserRoleRadios.prototype = $.extend(false, new $.JK.Widget(), {
		
	    id: "user-roles-widget",
	    
	    html: '<dummy><div class="di">{{for options}}'+
	            '<label for="user_role_{{:name}}">{{if name==checked}}<input name="role" id="user_role_{{:name}}" value="{{:name}}"  type="radio" checked="checked"/>{{else}}<input name="role" id="user_role_{{:name}}" value="{{:name}}"  type="radio"/>{{/if}}<img height="34px" src="images/site/icon_{{:value}}.png" />{{:title}}</label>'+	         
			'{{/for}}</div></dummy>',
			
		store: {}
	  
	});
	
})(jQuery);	