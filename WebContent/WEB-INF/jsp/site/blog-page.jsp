<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="contextUrl" scope="request" value="${pageContext.servletContext.contextPath}"/>
<c:set var="blog" scope="request" value="${blog}"/>

<c:import var="head" url="include-style-script.jsp"/>
<c:import var="footer" url="include-footer.jsp"/>
<c:import var="head_banner" url="include-head-bar.jsp"/>
<html>
<head>
	<title><spring:message code="home.page.title" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="keywords" content="跳蛙 , jumkid, 博客, blog, 旅行日记, travel diary" />
	<meta name="description" content="<c:out value="${blog.summary}"/>" />
	
	<c:out value="${head}" escapeXml="false"/>
		
	<script type="text/javascript">
	<!--
	function init() {	
		prettyPrint();
						
		new $.JK.site.SocialCommentWidget({
			module: 'blog',
			moduleRefId: '<c:out value="${requestScope.blog.uuid}" />',
			targetDiv: $('#social-comment-edit-panel')
		}).load();
		
	};
	-->
	</script>
	
</head>

<body>

<div id="basic_wrapper">
	<!--  Top main bar -->
	<c:out value="${head_banner}" escapeXml="false"/>
	    
	<div id="main_wrapper">
  					
        <div id="main_panel">
        	
        	<div id="center_wrapper">
        		<div id="blog_title_indicator" style="background:#<c:out value="${blog.colorcode}"/>">&nbsp;</div>
				<div id="blog_title_panel"><h1><c:out value="${blog.title}"/></h1></div>
				<div id="blog_author_panel"><c:out value="${blog.author}"/>&nbsp;&nbsp;&nbsp;<fmt:formatDate pattern="yyyy-MM-dd" value="${blog.createdDate}" /></div>
				
				<div class="di" style="border-bottom: 1px solid #ededed;margin: 5px 0px;">&nbsp;</div>
					
				<div id="blog_content_panel"><c:out value="${blog.content}" escapeXml="false" /></div>
			
				<div class="di" style="border-bottom: 1px solid #ededed;margin: 5px 0px;">&nbsp;</div>
				
				<div id="social-comment-edit-panel"></div>
				
			</div>
			
			<div id="east_wrapper">
			    <div class="blog_side_panel">
			    	<h3><spring:message code="blog.page.recent" /></h3>
				    <ul>
					<c:forEach items="${requestScope.blogs}" var="blog">
					   <li><a href="${blog.filename}"><c:out value="${blog.title}"/></a></li>
					</c:forEach>
					</ul>
				</div>
				
				<div class="blog_side_panel">
			    	<h3><spring:message code="blog.page.top" /></h3>
				    
				</div>
				
			</div>
			
			
        </div>
	   
	</div>	    
	
</div>

</body>

</html>