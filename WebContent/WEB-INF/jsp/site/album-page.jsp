<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextUrl" scope="request"
	value="${pageContext.servletContext.contextPath}" />
<c:set var="album" scope="request" value="${album}" />
<c:import var="head" url="include-style-script.jsp" />
<c:import var="footer" url="include-footer.jsp" />
<c:import var="head_banner" url="include-head-bar.jsp" />
<html>
<head>
<title><spring:message code="album.page.title" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="跳蛙 影集" />
<meta name="keywords" content="跳蛙, jumkid, 影集, album " />

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
		
		<c:if test="${fn:contains(album.style, 'cd')}">
			var album = {
					attachments:[
						<c:forEach items="${album.attachmentFiles}" var="mfile">
						    <c:if test="${fn:contains(mfile.mimeType, 'audio')}">
							{uuid: '${mfile.uuid}', title: '${mfile.title}', filename: '${fn:escapeXml(mfile.filename)}', mimeType: '${mfile.mimeType}'},
							</c:if>
						</c:forEach>	
							{mimeType:"dummy"}
						]
			};
			new $.JK.site.MusicAlbumWidget({
				targetDiv: $('#music-album-panel')
			}).setStore(album).show();
		</c:if>
		
		new $.JK.site.SocialCommentWidget({
			module: 'album',
			moduleRefId: '<c:out value="${album.uuid}" />',
			targetDiv: $('#social-comment-edit-panel')
		}).load();
		
	};
	
	</script>

</head>

<body>

	<div id="basic_wrapper">
		<!--  Top main bar -->
		<c:out value="${head_banner}" escapeXml="false" />

		<div id="main_wrapper">

			<div id="main_panel">

				<div id="center_wrapper">
					
					<div id="album_title_panel">
						<img class="user_avatar" src="<c:out value="${contextUrl}"/>/user/avatar/<c:out value="${album.createdBy}" />" />&nbsp;&nbsp;&nbsp;<c:out value="${album.title}" />
					</div>

					<div class="di"
						style="border-bottom: 1px solid #ededed; margin: 5px 0px;">&nbsp;</div>
					
					<div id="album_content_panel">
						<c:out value="${album.content}" escapeXml="false" />
					</div>

					<c:if test="${not empty album.attachments}">
						<c:choose>
							<c:when test="${fn:contains(album.style, 'gallery')}">
								<div>
									<c:forEach items="${album.attachmentFiles}" var="mfile" varStatus="loop">
										<c:if test="${fn:contains(mfile.mimeType, 'image')}">
											<div class="album_gallery_item">
												<div><img src="<c:out value="${contextUrl}" />/file/tmb/${mfile.uuid}?large=true" width="640"/></div>
												<label>${loop.index+1} &nbsp; ${mfile.title}</label>
											</div>
										</c:if>
									</c:forEach>
								</div>
							</c:when>
							<c:when test="${fn:contains(album.style, 'video')}">
								<!-- Simple AnythingSlider -->
								<div id="slider-viewer" class="di" style="width: 701px; height: 480px;">
									<ul id="slider">
										<c:forEach items="${album.attachmentFiles}"
											var="mfile">
											<c:if test="${fn:contains(mfile.mimeType, 'video')}">
												<li><video width="320" height="240" controls="controls" preload="none" 
														poster="../../images/site/my_video_poster.jpg">
														<source
															src='<c:out value="${contextUrl}" />/file/s/${mfile.uuid}'
															type="video/mp4" />
													</video></li>
											</c:if>
										</c:forEach>
									</ul>
								</div>
								<!-- Simple AnythingSlider -->
							</c:when>
							<c:when test="${fn:contains(album.style, 'cd')}">
								<div id="music-album-panel" class="di" style="width: 701px;">
									<!-- music album widget -->
								</div>
							</c:when>
						</c:choose>
					</c:if>
					<!-- END AnythingSlider -->

					<div class="di"
						style="border-bottom: 1px solid #ededed; margin: 5px 0px;">&nbsp;</div>

					<div id="social-comment-edit-panel"></div>

				</div>

				<div id="east_wrapper">
					<div class="album_side_panel">
						<h3><spring:message code="album.page.recent" /></h3>
						<ul>
							<c:forEach items="${requestScope.albums}" var="album">
								<li><a href="${album.filename}"><c:out
											value="${album.title}" /></a></li>
							</c:forEach>
						</ul>
					</div>
					
					<div class="album_side_panel">
						<h3><spring:message code="album.page.top" /></h3>
						
					</div>

				</div>


			</div>

		</div>

	</div>

</body>

</html>