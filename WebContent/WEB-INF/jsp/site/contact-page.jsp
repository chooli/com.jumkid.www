<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:import var="head" url="include-style-script.jsp"/>
<c:import var="head_banner" url="include-head-bar.jsp"/>
<c:import var="footer" url="include-footer.jsp" />
<html>
<head>
	<title><spring:message code="contact.page.title" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="跳蛙 联系我们" />
    <meta name="keywords" content="跳蛙, jumkid, 联系我们" />
	
	<c:out value="${head}" escapeXml="false"/>
	
	<script>
		function init() {	

			new $.JK.site.ContactUsWidget({
				targetDiv: $('#contact-us-panel')
			}).show(true);
			
		};
	</script>
	
</head>

<body>

<div id="basic_wrapper">
	<!--  Top main bar -->
	<c:out value="${head_banner}" escapeXml="false"/>
	    
	<div id="main_wrapper">
  					
        <div id="main_panel">
        	
        	<div id="center_wrapper">
        		<div style="margin: 13px 11px;">
	        		<h1><spring:message code="contact.page.subtitle" /></h1>
	        		<div style="margin:28px 20px;font-size:18px;">
	        		<spring:message code="contact.page.subtitle1" />，
	        		<div class="di">&nbsp;</div>
					<spring:message code="contact.page.subtitle2" />
					</div>
	        	
					<div id="contact-us-panel"></div>
					
				</div>
			</div>
			
			
        </div>
	   
	</div>	    
	
</div>

<c:out value="${footer}" escapeXml="false"/>

</body>

</html>