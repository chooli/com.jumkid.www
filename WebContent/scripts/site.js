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
/**
 * Created by Chooli on 1/20/2015.
 */

(function($){

    $.JK.site.ContactUsWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.ContactUsWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'contact-us-wdg',

        html: '<dummy>'+
                '<form id="contactus_form">'+
                    '<div><label for="firstname">'+SYSLang.Firstname+'</label><input type="text" id="firstname" name="firstname"></div>'+
                    '<div><label for="lastname">'+SYSLang.Lastname+'</label><input type="text" id="lastname" name="lastname" /></div>'+
                    '<div><label for="email">'+SYSLang.Email+'</label><input type="text" id="email" name="email" /></div>'+
                    '<div><label for="phone">'+SYSLang.Phone+'</label><input type="text" id="phone" name="phone" /></div>'+
                    '<div><label for="comment">'+SYSLang.Comment+'</label><textarea id="comment" name="comment" rows="10" cols="50"></textarea></div>'+

                    '<div style="margin: 13px 0px 5px 130px; font-size: 16px;" id="form-submit"><input class="submit" type="submit" value="'+SYSLang.Submit+'" /</div>'+
                '</form>'+
        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this;
            /*-- event bindings --*/
            $("#contactus_form").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    comment: {
                        required: true,
                        minlength: 2
                    }
                },
                messages: {
                    firstname: "✖",
                    lastname: "✖",
                    email: "✖",
                    comment: "✖"
                },

                submitHandler: function() {
                    wdg.save();
                }

            });

            return wdg;
        },

        save: function(){
            var wdg = this;

            if(!$.JK.checkinProgress()) return;

            var formData = $.JK.convertFormToJSON('contactus_form');

            $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.CONTACT.SAVE),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: formData,
                success: function(data, status, request) {

                    if(data.success){
                        $('#form-submit-btn').remove();
                        $('#form-submit').text(SYSLang.CMSG_REQUEST_SUBMIT);
                    }else{
                        //TODO
                    }

                    $.JK.checkoutProgress();
                    return wdg;

                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                    return wdg;
                }
            });
        }

    });

})(jQuery);

/**
 * Created by Chooli on 05/29/2015.
 */
(function($){
	
	$.JK.site.FlightSearchWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.FlightSearchWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'flight-search-wdg',

        store: {},

        html: '<dummy>'+
			    '<input id="flight-search-input" type="text" placeholder="type in flight no to search"/>'+
		      '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this;
            
            new $.JK.site.FlightInfoWidget({
				targetDiv: $('#flight-aircraf-info')
			}).show();

            $("#flight-search-input").on("keypress", function(e){
            	if(e.which === 13){
            		$.JK.getCmp("flight-info-wdg").load($(this).val());
                }
            })
            
            return this;

        }
        
    });
        

    $.JK.site.FlightInfoWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.FlightInfoWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'flight-info-wdg',
        
        map: null,
        
        waypoints: [],

        store: {},

        html: '<dummy>'+
			    '<div style="float:left; margin:0px 0px; padding:25px 26px; width: 510px;display: block;">'+
					'<div>'+
						'<h3>Aircraft Profile</h3>'+
						'<div><img src="images/site/icon-flight-type.png">{{:type}}</div>'+
					'</div>'+
					'{{if groundspeed!==0}}<div>'+
						'<div>'+
							'<h3>Departure</h3>'+
							'<div><img src="images/site/icon-flight-city.png"> {{:origin}}</div>'+
							'<div><img src="images/site/icon-flight-time.png"> {{:~showDate(departureDatetime)}}</div>'+
							'<div><img src="images/site/icon-flight-date.png"> {{:~showTime(departureDatetime)}}</div>'+
						'</div>'+
						'<div>'+
							'<h3>Arrival</h3>'+
							'<div><img src="images/site/icon-flight-city.png"> {{:destination}}</div>'+
							'<div><img src="images/site/icon-flight-time.png"> {{:~showDate(arrivalDatetime)}}</div>'+
							'<div><img src="images/site/icon-flight-date.png"> {{:~showTime(arrivalDatetime)}}</div>'+
						'</div>'+
					'</div>{{/if}}'+
				'</div>'+
				'<div style="margin:0px 0px; width:544px; display:block; float:left;">'+
					'<div style="background-color: #3FBCEF;min-height:230px; margin:0px 0px 25px 0px; padding: 5px 8px;">'+
						'<div id="map-canvas"></div>'+
					'</div>'+
					'<div style="background-color: #3FBCEF;min-height:230px; margin:0px 0px 25px 0px;">'+
					
					'</div>'+
				'</div>'+
		       '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var self = this;

            var mapOptions = {
          		  panControl: false,
          		  zoomControl: true,
          		  zoomControlOptions: {
          			style: google.maps.ZoomControlStyle.SMALL,
          			position: google.maps.ControlPosition.LEFT_TOP
          		  }, 
          		  mapTypeControl: false,
          		  mapTypeControlOptions: {
          			style: google.maps.MapTypeControlStyle.DEFAULT,
          			mapTypeIds: [
          				google.maps.MapTypeId.ROADMAP,
          				google.maps.MapTypeId.SATELLITE
          			  ]
          		  },
          		  mapTypeId: google.maps.MapTypeId.SATELLITE,
          		  scaleControl: false,
          		  streetViewControl: false,
          		  overviewMapControl: true,
                    center: new google.maps.LatLng(40.080111, 116.584556),
                    zoom: 2,
          		  disableDefaultUI: true
            };
            this.map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            
            return this;

        },

        load: function(flightId){
            var self = this;

            var promise = $.ajax({
                type: "GET",
                url: $.JK.assembleUrl($.JK.API.FLIGHT.IN_FLIGHT, {flightId:flightId}),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function(data, textStatus, request) {

                    if(data.success){
                    	self.show(true);
                    	self.setStore(data.inflightinforesult);
                    	//extract waypoints for coordinate
                    	if(data.inflightinforesult.waypoints){
                    		var _waypointsArray = data.inflightinforesult.waypoints.split(" ");
                        	for(var i=0; i<_waypointsArray.length-1; i=i+2){
                        		var lat = Number(_waypointsArray[i]), lng = Number(_waypointsArray[i+1]);
                        		self.waypoints.push(new google.maps.LatLng(lat, lng)); 
                        	}
                        	self.drawFlightRoute();
                        	self.dropOriginAndDestination();
                        	self.setCenterPoint();
                    	}                    	
                    	                    	
                    }

                    $.JK.checkoutProgress();
                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                }

            });

            return promise;

        },
        
        drawFlightRoute: function(){
        	
        	var line = new google.maps.Polyline({
        	    path: this.waypoints,
        	    geodesic: true,
        	    strokeColor: '#FF0000',
        	    strokeOpacity: 1.0,
        	    strokeWeight: 2,
        	    map: this.map
        	  });
        	
        	return this;
        	
        },
        
        dropOriginAndDestination: function(){
        	var origin = new google.maps.Marker({
    			map: this.map,
    			position: this.waypoints[0],
    			icon: 'images/site/arrow_up_64.png'
    		}),
        	destination = new google.maps.Marker({
    			map: this.map,
    			position: this.waypoints[this.waypoints.length-1],
    			icon: 'images/site/arrow_down_64.png'
    		});
        	
        },
        
        setCenterPoint: function(){
        	if(this.waypoints && this.waypoints.length>2){
        		var bound = new google.maps.LatLngBounds(this.waypoints[0], this.waypoints[this.waypoints.length-1]);
        		
            	this.map.setCenter(bound.getCenter());
        	}            
        	
        	return this;
        	
        }

    });

})(jQuery);
/**
 * Created by Chooli on 1/20/2015.
 */
(function($){

    $.JK.site.MusicAlbumWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.MusicAlbumWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'music-album-wdg',

        store: {},

        isLoop: false,

        html: '<dummy>'+
			        '<div><img id="music-album-btn-play-all" src="../../images/site/icon_play.png" style="height: 46px; cursor: pointer;" alt="Play all"/></div>'+
			        '{{for attachments}}{{if mimeType.indexOf("audio")!==-1}}'+
			        '<div class="album_audio_item">'+
			        '<img src="../../file/tmb/{{:uuid}}" />'+
			        '<label>{{if title}}{{:title}}{{else}}{{:filename}}{{/if}}</label>'+
			        '<div class="album_audio_control"><img id="music-album-btn-play-{{:#getIndex()}}" src="../../images/site/icon_play.png" style="height: 32px;" alt="{{:#getIndex()}}"/><span id="music-album-play-time-{{:#getIndex()}}">&nbsp;</span></div>'+
			        '<audio preload="none" alt="{{:#getIndex()}}">'+
			        '<source src="../../file/s/{{:uuid}}" type="audio/mpeg">'+
			        'Your browser does not support the audio element.'+
			        '</audio>'+
			        '</div>'+
			        '{{/if}}{{/for}}'+
		        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this,
                attachments = this.getStore().attachments;

            $('#music-album-btn-play-all').on('click', function(e){

                var btn = $('#music-album-btn-play-all'),
                    isPlay = btn.attr('src').indexOf('stop.png') != -1;

                if(!isPlay){
                    btn.attr('src', '../../images/site/icon_stop.png');
                    wdg.playAt(0);
                }else{
                    btn.attr('src', '../../images/site/icon_play.png');
                    wdg.stopAll();
                }

                wdg.setLoop(true);
            });

            for(var i=0;i<attachments.length;i++){
                if($('#music-album-btn-play-'+i)){
                    $('#music-album-btn-play-'+i).on('click', function(e){
                        var index = parseInt($(this).attr('alt'));

                        wdg.playAt(index);

                    });

                    if($('audio')[i]){
                        $('audio')[i].onended = function(e){
                            var index = parseInt($(this).attr('alt'));
                            $('#music-album-btn-play-'+index).attr('src', '../../images/site/icon_play.png');
                            $(this).currentTime = 0;

                            //play the next song if isLoop
                            index ++;
                            if(wdg.getLoop()){
                                if($('#music-album-btn-play-'+index)) wdg.playAt(index);
                                else wdg.playAt(0);
                            }

                        };
                    }

                }

            }

        },

        playAt: function(index){
            this.stopAll(index);

            var btn = $('#music-album-btn-play-'+index),
                isPlay = btn.attr('src').indexOf('pause.png') != -1;

            if(!isPlay){
                btn.attr('src', '../../images/site/icon_pause.png');
                $('audio')[index].play();
            }else{
                btn.attr('src', '../../images/site/icon_play.png');
                $('audio')[index].pause();
            }
        },

        stopAll: function(exclude){
            var attachments = this.getStore().attachments;
            //stop all other playing audio
            for(var j=0;j<attachments.length;j++){
                if(exclude===j) continue;
                if(attachments[j].mimeType.indexOf("audio")>-1){
                    $('audio')[j].pause();
                    if($('audio')[j].currentTime && $('audio')[j].currentTime!==0){
                    	$('audio')[j].currentTime=0;
                    }
                    $('#music-album-btn-play-'+j).attr('src', '../../images/site/icon_play.png');
                }
            }
        },

        setLoop: function(isLoop){
            this.isLoop = isLoop;
        },

        getLoop: function(){
            return this.isLoop;
        }

    });

})(jQuery);
/**
 * Created by Chooli on 1/20/2015.
 */
(function($){

    $.JK.site.SocialCommentWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.SocialCommentWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'social-comment-wdg',

        module: null,

        moduleRefId: null,

        store: {},

        html: '<dummy>'+
        '<form id="social-comment-form">'+
        '<div><img src="../../images/site/icon_socialcomment.png" width="51px"/><textarea id="social-comment" name="content" style="width:490px"></textarea>'+
        '<div id="social-comment-user-id" style="display:none;"><div style="width:41px;float:left;padding:12px 0px 0px 10px;">'+SYSLang.Name+'</div><input type="text" id="social_user_id_txt" name="socialUserId" style="width:480px"/>'+
        '<input type="submit" value="发表"/>'+
        '</div>'+
        '</form>'+
        '<div class="di">&nbsp;</div>'+
        '{{for socialcomments}}'+
        '<div class="social-comment-history-panel">'+
        '<img src="../../images/site/icon_socialcomment.png" /><span style="font-weight:bold;">{{:socialUserId}}</span>'+
        '<div>{{:content}}</div>'+
        '</div>'+
        '{{/for}}'+
        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this;

            $('#social-comment').on('focus', function(e){
                $('#social-comment-user-id').css('display', 'block').hide(0).fadeIn("slow");
            });

            $("#social-comment-form").validate({
                rules: {
                    content: "required",
                    socialUserId: "required"
                },
                messages: {
                    content: "✖",
                    socialUserId: "✖"
                },

                submitHandler: function() {
                    wdg.save();
                }

            });

            return this;

        },

        load: function(){
            var wdg = this;

            var promise = $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.SOCIALCOMMENT.LOAD),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {module:this.getModule(), moduleRefId:this.getModuleRefId()},
                success: function(data, textStatus, request) {

                    if(data.success){
                        wdg.setStore(data);
                        wdg.show(true);
                    }

                    $.JK.checkoutProgress();
                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                }

            });

            return promise;

        },

        setModule: function(module){
            this.module = module;
        },

        getModule: function(){
            return this.module;
        },

        setModuleRefId: function(module){
            this.moduleRefId = moduleRefId;
        },

        getModuleRefId: function(){
            return this.moduleRefId;
        },

        save: function(){
            var wdg = this;

            if(!$.JK.checkinProgress()) return;

            $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.SOCIALCOMMENT.SAVE),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $.extend({module:this.getModule(), moduleRefId:this.getModuleRefId()}, $.JK.convertFormToJSON('social-comment-form')),
                success: function(data, textStatus, request) {

                    if(data.success){
                        $('#social-comment-user-id').css('display', 'none').hide(0).fadeIn("slow");
                        wdg.load().done(function(){
                            $('#social-comment-form').css('display', 'none').hide(0).fadeIn("slow");
                        });
                    }else{
                        //TODO
                    }

                    $.JK.checkoutProgress();
                    return wdg;

                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                }

            });

        }

    });

})(jQuery);
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