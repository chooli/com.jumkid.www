<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="contextUrl" scope="request"
	value="${pageContext.servletContext.contextPath}" />
<c:import var="head" url="include-style-script.jsp" />
<c:import var="footer" url="include-footer.jsp" />
<c:import var="head_banner" url="include-head-bar.jsp" />
<html>
	<head>
		<title>跳蛙</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="description" content="跳蛙" />
		<meta name="keywords" content="跳蛙, jumkid" />
		
		<c:out value="${head}" escapeXml="false" />
		
		<script type="text/javascript">
		function init() {	
			
			prettyPrint();
			
			var toggleTime = 500,
				showCaptionInitially = true,			
				updateCaption = function(slider, init) {
			        if (init && showCaptionInitially) {
			            setTimeout(function() {
			                slider.$targetPage.find('.caption').animate({
			                    bottom: 0
			                }, toggleTime);
			            }, slider.options.delayBeforeAnimate + toggleTime);
			        } else if (!init) {
			            var cap = slider.$lastPage.find('.caption');
			            cap.css('bottom', -cap.innerHeight());
			        }
			    };
			
			$('#slider').anythingSlider({
				
				delay: 5000,
				
				toggleArrows: true,
				
				expand: true,
				
				resizeContents: true,
				
				buildNavigation: false,
				
				buildStartStop: false,
				
				addWmodeToObject: 'opaque',
				
				// Callback when the plugin finished initializing
			    onInitialized: function(e, slider) {
			    	_slider = slider;
			        slider.$items.each(function() {
			            var cap = $(this).find('.caption');
			            cap.css('bottom', -cap.innerHeight()).click(function() {
			                cap.animate({
			                    bottom: (cap.css('bottom') === "0px" ? -cap.innerHeight() : 0)
			                }, toggleTime);
			            });
			        });
			        updateCaption(slider, true);
			    },
	
			    // Callback before slide animates
			    onSlideBegin: function(e, slider) {
			        updateCaption(slider, true);
			    },
	
			    // Callback after slide animates
			    onSlideComplete: function(slider) {
			        updateCaption(slider, false);
			    }
			    
			}).anythingSliderVideo({
				// video id prefix; suffix from $.fn.anythingSliderVideo.videoIndex
				videoId : 'asvideo'
				
			});
			
			new $.JK.site.SocialCommentWidget({
				module: 'flyer',
				moduleRefId: '<c:out value="${requestScope.flyer.uuid}" />',
				targetDiv: $('#social-comment-edit-panel')
			}).load();
			
			$('#full-screen-btn').on('click', function(ev){
				$.JK.popup.fullscreen($('#slider-viewer'));
				setTimeout(function(){
	                // start the slideshow
	                $('.anythingBase').data('AnythingSlider').startStop(true);
	            }, 1000);
			});
			
			$(document).keyup(function(e) {
			  if (e.keyCode == 27) { 
				  $.JK.popup.exitFullscreen($('#slider-viewer'), 701, 404);
				  $('.anythingBase').data('AnythingSlider').startStop(false);
			  }   // esc
			});
			
		};
		
		</script>

	</head>

<body>

	<div id="basic_wrapper">
		<!--  Top main bar -->
		<c:out value="${head_banner}" escapeXml="false" />

		<div id="main_wrapper">

			<div id="main_panel">

				<div id="album_title_indicator">
					<c:if test="${not empty requestScope.flyer.featuredPic}">
						<img
							src="<c:out value="${contextUrl}" />/file/tmb/${flyer.featuredPic}" />
					</c:if>
				</div>
				<div id="album_title_panel">
					<c:out value="${requestScope.flyer.title}" />
				</div>

				<div class="di"
					style="border-bottom: 1px solid #ededed; margin: 5px 0px;">&nbsp;</div>


				<c:if test="${not empty requestScope.flyer.refProducts}">
					<c:choose>
					<c:when test="${requestScope.flyer.style == 'slide'}">
					<!-- Simple AnythingSlider -->
						<div id="slider-viewer" class="di" style="width: 701px; height: 404px;">
							<ul id="slider">
								<c:forEach items="${requestScope.flyer.products}" var="product">
									<c:if test="${fn:contains(product.mimeType, 'image')}">
									<li>
										<img src="<c:out value="${contextUrl}" />/file/tmb/${product.uuid}?large=true" width="640"/>
										<c:if test="${not empty product.title}">
											<div class="caption">
												<h3><c:out value="${product.title}" /></h3>
												<div><c:out value="${product.introduction}" /></div>
												<div style="float: right; margin-right: 10px;text-align:right;">
													<c:if test="${product.discountRate > 0}"><div style="text-decoration: overline;"><c:out value="${product.currency}" /><c:out value="${product.regularPrice}" /></div></c:if>
													<div style="font-size: 36px; font-weight: bold;"><c:out value="${product.currency}" /><c:out value="${product.salePrice}" /></div>
													<div style="color: red; font-weight: bold;">save <c:out value="${product.discountRate}" />%</div>
												</div>	
											</div>
										</c:if>
									</li>
									</c:if>	
								</c:forEach>
							</ul>
						</div>
					<!-- Simple AnythingSlider -->
					<button id="full-screen-btn" style="float:right;">Full screen</button>
					<div>
						<c:out value="${requestScope.flyer.content}" escapeXml="false" />
					</div>
					</c:when>
					
					<c:otherwise>
						<div style="font-size: 23px; font-weight: bold; margin: 13px 3px;">
							<c:out value="${requestScope.flyer.content}" escapeXml="false" />
						</div>
						<c:forEach items="${requestScope.flyer.products}" var="product">
							<c:if test="${fn:contains(product.mimeType, 'image')}">
							<div class="s-flyer-item-panel bottom">
								<div style="background: url(<c:out value="${contextUrl}" />/file/tmb/${product.uuid}) no-repeat;background-size: 100% auto;">
									<div>
										<h3><c:out value="${product.title}" /></h3>
										<div><c:out value="${product.introduction}" /></div>
										<div style="float: right; margin-right: 10px; text-align:right; width: auto;">
											<div style="text-decoration: line-through;"><c:if test="${product.discountRate > 0}"><c:out value="${product.currency}" /><c:out value="${product.regularPrice}" /></c:if></div>
											<div style="font-size: 36px; font-weight: bold;"><c:out value="${product.currency}" /><c:out value="${product.salePrice}" /></div>
											<div style="color: red; font-weight: bold;"><c:if test="${product.discountRate > 0}">save <c:out value="${product.discountRate}" />%</c:if></div>
										</div>	
									</div>
								</div>
							</div>
							</c:if>	
						</c:forEach>
					</c:otherwise>
					
					</c:choose>
				</c:if>
				<!-- END AnythingSlider -->
				
				
				<div class="di"
					style="border-bottom: 1px solid #ededed; margin: 5px 0px;">&nbsp;</div>

				<div id="social-comment-edit-panel"></div>

			</div>

		</div>

	</div>

</body>

</html>