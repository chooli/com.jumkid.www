/**
 * Created by Chooli on 1/20/2015.
 */
/**
 * 
 * (c)2014 Jumkid All rights reserved.
 * 
 */

(function($) {

	/*-- jsRender helper function define here --*/
	$.views.helpers({

		showInt : function(value) {
			return format('###.', value);
		},

		showNumber : function(value) {
			return format('#,###.00', value);
		},

		showBoolean : function(value) {
			return value ? SYSLang.Yes : SYSLang.No;
		},
		
		showDate: function(datetime){
			if(!datetime) return "N/A";
			return datetime.substring(0, datetime.indexOf(" "));
		},
		
		showTime: function(datetime){
			if(!datetime) return "N/A";
			return datetime.substring(datetime.indexOf(" ")+1);
		},

		trim : function(value, length) {
			if (value.length > length)
				return value.substring(0, length - 1) + "...";
			return value;
		}

	});

	// global single instance object
	$.JK = {

		// version number
		version : 0.2,

		locale : "en",

		contextUrl : null,

		sessionUserId : null,

		isInProgress : false,

		// use to register a component, give key, value
		componentMap : {},

		API : {

			SOCIALCOMMENT : {
				SAVE : "/socialcomment/save",
				LOAD : "/socialcomment/load"
			},

			USER : {
				SIGNUP : "/user/signup",
				EXISTS : "/user/username-exists/{username}",
				EMAIL_EXISTS : "/user/email-exists",
				EMAIL_NOT_EXISTS: "/user/email-not-exists",
				FIND_PWD : "/user/find-pwd"
			},

			CONTACT : {
				SAVE : "/contact/save"
			},
			
			FLIGHT : {
				IN_FLIGHT : "/flight/inflight/{flightId}"
			}

		},

		assembleUrl : function(api, params, noPrefix) {
			var regEx = /\{[-_\w]+\}/g;
			var url = (!noPrefix) ? this.contextUrl + api : api;
			url = url.replace(regEx, function(str) {
				var match = /[-_\w]+/g.exec(str);
				if (params && params[match[0]])
					return params[match[0]];
				else
					return '';
			});
			return url;
		},

		setLocale : function(locale) {
			this.locale = locale;
		},

		getLocale : function() {
			return this.locale;
		},

		setContextUrl : function(contextUrl) {
			this.contextUrl = contextUrl;
		},

		getContextUrl : function() {
			return this.contextUrl;
		},

		setSessionUserId : function(sessionUserId) {
			this.sessionUserId = sessionUserId;
		},

		getSessionUserId : function() {
			return this.sessionUserId;
		},

		setCmp : function(key, value) {
			if (typeof key == "object") {
				if (!key.hasOwnProperty._id) {
					key.hasOwnProperty = function(key) {
						return Object.prototype.hasOwnProperty.call(this, key);
					};
					key.hasOwnProperty._id = this._shared.id++;
				}
				this.componentMap[key.hasOwnProperty._id] = value;
			} else {
				this.componentMap[key] = value;
			}
			return this.componentMap; // for chaining
		},

		getCmp : function(key) {
			if (typeof key == "object") {
				return this.componentMap[key.hasOwnProperty._id];
			}
			return this.componentMap[key];
		},

		showError : function(msg, targetDivId) {
			$('#' + targetDivId).empty();
			$('#' + targetDivId).html(msg);
			$('#' + targetDivId).show("slow");
		},

		/**
		 * Submit lock for duplicate submit request by the user
		 */
		checkinProgress : function() {
			if (!this.isInProgress) {
				this.isInProgress = true;
				return true;
			} else {
				var target_message_bar = "popup_error_msg";

				this.showError(SYSLang.CMSG_IN_PROGRESS, target_message_bar);
				return false;
			}
		},
		checkoutProgress : function() {
			if (this.isInProgress) {
				this.isInProgress = false;
				return true;
			}
		},

		// enable/disable button with different style
		disableButton : function(buttonId) {
			$("#" + buttonId).attr("disabled", "true");
			$("#" + buttonId).attr("class", "action_button_text_disable");
		},
		enableButton : function(buttonId) {
			$("#" + buttonId).removeAttr('disabled');
			$("#" + buttonId).attr("class", "action_button_text");
		},

		/* == timer functions == */
		second : function(targetTimer) {
			if (secCount > 0 && (secCount % 60) === 0) { // every minute
				minCount += 1;
				secCount = 0;
			}
			if (minCount > 0 && (minCount % 60) === 0) { // every hour
				hrCount += 1;
				minCount = 0;
			}
			timeToShow = (hrCount <= 9 ? "0" + hrCount : hrCount) + ":" +
					 (minCount <= 9 ? "0" + minCount : minCount) + ":" +
					 (secCount <= 9 ? "0" + secCount : secCount);
			$('#' + targetTimer).html(timeToShow);
			secCount += 1;
		},
		startclock : function(targetTimer) {
			timerInterval = setInterval("$.JK.second('" + targetTimer + "')",
					1000);
		},
		stopclock : function() {
			clearInterval(timerInterval);
			minCount = hrCount = secCount = 0;
		},
		/* == timer functions end == */

		showNumber : function(itemDom, itemValue) {
			// Animate the element's value from 0 to targetNumberValue:
			jQuery({
				someValue : 0
			}).animate({
				someValue : itemValue
			}, {
				duration : 500,
				easing : 'swing', // can be anything
				step : function() { // called on every step
					// Update the element's text with rounded-up value:
					itemDom.text(Math.ceil(this.someValue));
				}
			});
		},

		formatDate : function(date, format) {
			var day = date.getDate();
			day = ("0" + day).length == 2 ? "0" + day : day;
			var month = date.getMonth() + 1;
			month = ("0" + month).length == 2 ? "0" + month : month;
			var year = date.getFullYear();
			// default format yyyy_mm_dd
			var my_date = year + "-" + month + "-" + day;

			if ("mm_dd_yyyy" == format) {
				my_date = month + "-" + day + "-" + year;
			} else if ("yyyymmdd" == format) {
				my_date = year + month + day;
			} else if ("mmddyyyy" == format) {
				my_date = month + day + year;
			} else {
				my_date = year + "-" + month + "-" + day;
			}

			return my_date;
		},

		convertFormToJSON : function(formId) {
			var array = $('#' + formId).serializeArray();
			var json = {};

			jQuery.each(array, function() {
				json[this.name] = this.value || '';
			});

			return json;
		},
		
		addParameterToURL: function(url, param, value){
		    var hash       = {};
		    var parser     = document.createElement('a');

		    parser.href    = url;

		    var parameters = parser.search.split(/\?|&/);

		    for(var i=0; i < parameters.length; i++) {
		        if(!parameters[i])
		            continue;

		        var ary      = parameters[i].split('=');
		        hash[ary[0]] = ary[1];
		    }

		    hash[param] = value;

		    var list = [];  
		    Object.keys(hash).forEach(function (key) {
		        list.push(key + '=' + hash[key]);
		    });

		    parser.search = '?' + list.join('&');
		    return parser.href;
		}

	};

	/**
	 * a common widget object for actual specific widget to be used
	 */
	$.JK.Widget = function(settings) {
		// this.id = settings.id || this.id;
		// this.targetDiv = settings.targetDiv || this.targetDiv;
		// this.store = settings.store || this.store;
		$.extend(true, this, settings);
	};

	$.JK.Widget.prototype = {

		id : 'wdg',

		targetDiv : $('<div></div>'),

		store : {},

		html : '<div></div>',

		setId : function(id) {
			this.id = id;
		},
		getId : function() {
			return this.id;
		},

		setStore : function(store) {
			this.store = store;
			return this; // chaining
		},
		getStore : function(store) {
			return this.store;
		},

		getTemplate : function() {
			return this.html;
		},

		getTargetDiv : function() {
			return this.targetDiv;
		},

		show : function() {
			if (!this.store)
				return;
			var _html = $(this.html).render(this.store);
			this.getTargetDiv().html(_html).hide(0).fadeIn("slow");

			return this;
		},

		append : function() {
			if (!this.store)
				return;
			var _html = $(this.html).render(this.store);
			this.getTargetDiv().append(_html);
			return this;
		},

		renderTo : function(targetDiv) {
			if (!this.store)
				return;

			this.targetDiv = targetDiv || this.targetDiv;
			this.show();
		},

		onClick : function(uuid, handler) {
			$('#' + uuid).bind({
				click : handler
			});
		},

		fireClick : function(uuid) {
			$('#' + uuid).trigger('click');
		}

	};

	$.JK.site = {};

	$.JK.popup = {};

	$.JK.popup.fullscreen = function(targetEl) {
		$(targetEl).css({
			width : $(window).width(),
			height : $(window).height(),
			left : 0,
			top : 0,
			position : 'fixed',
			display : 'block'
		});
	};

	$.JK.popup.exitFullscreen = function(targetEl, orgWidth, orgHeight) {
		$(targetEl).css({
			width : orgWidth,
			height : orgHeight,
			position : 'relative',
			display : 'block'
		});
	};

	/**
	 * Popup waiting widget
	 */
	$.JK.popup.WaitingWidget = function(settings) {
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};

	$.JK.popup.WaitingWidget.prototype = $
			.extend(
					false,
					new $.JK.Widget(),
					{

						id : "popup-waiting-wdg",

						html : '<dummy>'+
								 '<div id="top_waiting_drawer"><img src="../images/site/gray-loading.gif" height="38px"/></div>'+
								 '</dummy>',

						wait : function() {
							$('#top_waiting_drawer').animate({
								top : '44px'
							}, 300);
						},

						finish : function() {
							setTimeout(function() {
								$('#top_waiting_drawer').animate({
									top : '-50px'
								}, 300);
							}, 1000);
						}

					});

	/**
	 * Popup message widget
	 */
	$.JK.popup.MessageWidget = function(settings) {
		$.extend(true, this, settings);
		$.JK.setCmp(this.getId(), this);
		return this;
	};

	$.JK.popup.MessageWidget.prototype = $.extend(false, new $.JK.Widget(), {

		id : "popup-message-wdg",
		html : '<dummy>' + '<div id="popup_message_text"></div>' + '</dummy>',
		store : {},

		slideDown : function(msg) {
			$('#popup_message_text').html(msg);
			$('#popup_message_text').animate({
				top : '44px'
			}, 300);

			this.slideUp();
		},

		slideUp : function() {
			setTimeout(function() {
				$('#popup_message_text').animate({
					top : '-50px'
				}, 300);
			}, 3000);
		}

	});

})(jQuery);