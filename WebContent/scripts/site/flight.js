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