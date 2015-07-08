<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:import var="head" url="include-style-script.jsp" />
<c:import var="footer" url="include-footer.jsp" />
<c:import var="head_banner" url="include-head-bar.jsp" />
<c:set var="contextUrl" scope="request" value="${pageContext.servletContext.contextPath}" />
<c:set var="locale" scope="request" value="${pageContext.response.locale}"/>
<html>

	<head>
		<title><spring:message code="home.page.title" /></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	    <meta name="description" content="跳蛙Jumkid行程管理为你提供个人的旅行计划工具，当你把旅行看作是一次生活意义的探索，一次学习过程，一次有目的计划的活动，跳蛙就是你的得力助手工具" />
	    <meta name="keywords" content="跳蛙, jumkid, 旅行, trip, 行程计划, 行程助手, Itineray, 影集, album, 旅行博客, blog, 旅游产品, travel flyer" />
	    <meta name="google-site-verification" content="RpUlrav0NU9ftbJRLSdqrMawDO8Tc2KWnCc52mxGi1s" />
		<meta name="baidu-site-verification" content="2vIJOrbLdS" />
		
		<c:out value="${head}" escapeXml="false"/>
		
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
					
					toggleArrows: false,
					
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
				
			};
			
			</script>
		
	</head>

<body>

<div id="basic_wrapper">
	
	<!--  Top main bar -->
	<c:out value="${head_banner}" escapeXml="false"/>
	
	<div id="main_wrapper">
	
				<div id="home-slider-viewer">
					<div>
					<ul id="slider">
						<li>
							<img src="images/site/post/jk-post-3.jpg" width="800"/>
							<div class="caption">
								<span><spring:message code="home.slider.itinerary" /></span>
							</div>
						</li>	
						<li>
							<img src="images/site/post/jk-post-2.jpg" width="800"/>
							<div class="caption">
								<span><spring:message code="home.slider.share" /></span>
							</div>
						</li>	
						<li>
							<img src="images/site/post/jk-post-4.jpg" width="800"/>
							<div class="caption">
								<span><spring:message code="home.slider.tools" /></span>
							</div>
						</li>						
					</ul>
					</div>
				</div>
				
				<div class="di" style="margin: 25px 5px;font-size: 46px;"><spring:message code="home.page.share" /></div>
  											    
			    <div id="media_list_panel">
				<c:forEach items="${requestScope.mfiles}" var="mfile">
					
					<c:if test="${ mfile.module == 'blog'}">
					   <div class="s-blog-item-panel" style="background:#<c:out value="${mfile.colorcode}"/>" onClick="window.location='<c:out value="${contextUrl}" />/blog/l/${mfile.filename}'">
					   	<div><c:out value="${mfile.title}"/>&nbsp;&nbsp;<a href="<c:out value="${contextUrl}" />/blog/l/${mfile.filename}"><img src="images/site/icon-linkto.png" height="16px"/></a></div>
					   </div>
					</c:if> 
					
					<c:if test="${ mfile.module == 'album'}">
					   <div class="s-home-item-panel" onClick="window.location='<c:out value="${contextUrl}" />/album/l/${mfile.uuid}'">
					   	<c:if test="${not empty mfile.featuredPic}"><div style="height:159px; background: url(<c:out value="${contextUrl}" />/file/tmb/${mfile.featuredPic}) no-repeat;background-size: 100% auto;"><a href="<c:out value="${contextUrl}" />/album/l/${mfile.uuid}">&nbsp;</a></div></c:if>
					    <div style="height:16px;padding: 4px 0px 0px 0px; text-align: center;font-size:14px;"><c:out value="${mfile.title}"/></div>
					   </div>
					</c:if> 
					
					<c:if test="${ mfile.module == 'flyer'}">
					   <div class="s-home-item-panel" onClick="window.location='<c:out value="${contextUrl}" />/flyer/l/${mfile.uuid}'">
					   	<c:if test="${not empty mfile.featuredPic}"><div style="text-align: right; height:159px; background: url(<c:out value="${contextUrl}" />/file/tmb/${mfile.featuredPic}) no-repeat;background-size: 100% auto;"><a href="<c:out value="${contextUrl}" />/flyer/l/${mfile.uuid}"><img src="images/site/icon-sale.png" style="width:48px;" /></a></div></c:if>
					   	<div style="padding: 4px 0px 0px 0px; text-align: center;font-size:14px;"><c:out value="${mfile.title}"/></div>
					   </div>
					</c:if>
					  
				</c:forEach>
				</div>	
								
				<c:if test="${more}">
					<button>more</button>
				</c:if>
							        	   
	</div>	    
		
</div>

<c:out value="${footer}" escapeXml="false"/>

</body>

</html>