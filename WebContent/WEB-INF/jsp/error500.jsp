<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:import var="head" url="site/include-style-script.jsp"/>
<c:import var="head_banner" url="site/include-head-bar.jsp"/>
<html>

	<head>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Jumkid - Error Page</title>
	
	<c:out value="${head}" escapeXml="false"/>
	
	</head>

<body>
	
	<div id="basic_wrapper">
	
		<!--  Top main bar -->
		<c:out value="${head_banner}" escapeXml="false"/>
		
		<div id="main_wrapper">
	  					
	        <div id="main_panel">
				<div style="margin: 30px 30px; font-size:21px; color:#898989;">噢！你目前无法访问该页面和相应服务，请重新登陆再试试</div>
	        </div>
	        	   
		</div>	    
			
	</div>

</body>

</html>