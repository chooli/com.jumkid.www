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
	<title><spring:message code="itinerary.page.title" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="description" content="跳蛙 行程 计划" />
	<meta name="keywords" content="跳蛙, jumkid, 行程, itinerary, 计划  planner" />
	
	<c:out value="${head}" escapeXml="false" />
	
		<script type="text/javascript">
			function init() {	
				prettyPrint();
								
				new $.JK.site.SocialCommentWidget({
					module: 'blog',
					moduleRefId: '<c:out value="${requestScope.blog.uuid}" />',
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

				<div id="center_wrapper">
	        		<div id="blog_title_indicator" style="background:#<c:out value="${blog.colorcode}"/>">&nbsp;</div>
					<div id="blog_title_panel"><h1><c:out value="${blog.title}"/></h1></div>
					
					<div class="di" style="border-bottom: 1px solid #ededed;margin: 5px 0px;">&nbsp;</div>
						
					<div id="blog_content_panel"><c:out value="${blog.content}" escapeXml="false" /></div>
				
					<div class="di" style="border-bottom: 1px solid #ededed;margin: 5px 0px;">&nbsp;</div>
					
					<div id="social-comment-edit-panel"></div>
					
				</div>

				<div id="east_wrapper">
					<div class="album_side_panel">
						<span>关于行程计划</span>
						<ul>
							<li><a href="${album.filename}"></a></li>
						</ul>
					</div>

				</div>

		</div>

	</div>

</body>

</html>