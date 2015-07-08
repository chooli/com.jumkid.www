<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:import var="head" url="include-style-script.jsp"/>
<c:import var="head_banner" url="include-head-bar.jsp"/>
<c:import var="footer" url="include-footer.jsp" />
<html>
<head>
	<title><spring:message code="home.page.Signin" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="跳蛙" />
    <meta name="keywords" content="跳蛙, jumkid, 登陆, login" />
    <sec:csrfMetaTags />
	
	<c:out value="${head}" escapeXml="false"/>
	
	<script>
		function init() {
	
			var signInWidget = new $.JK.user.SignInWidget({
				targetDiv: $('#user_signin_panel')
			}).show();
			
		}
	</script>
	
</head>

<body>

<div id="basic_wrapper">
	<!--  Top main bar -->
	<c:out value="${head_banner}" escapeXml="false"/>
	    
	<div id="main_wrapper">
  					
        <div id="main_panel" style="background: #fff url(images/site/site-bg-large-03.jpg) no-repeat left top;">
        	
        	<div id="center_wrapper">
        		<div style="margin: 13px 11px;">
	        		
	        		<div id="user_signin_panel">
	        		
					     <!-- user signin widget here -->
					</div>	   
					
					<div id="user_signup_panel">
					     <!-- user signup widget here -->
					</div>	 
					
				</div>
			</div>
			
			
        </div>
	   
	</div>	    
	
</div>

<c:out value="${footer}" escapeXml="false"/>

</body>

</html>