<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextUrl" scope="request"
	value="${pageContext.servletContext.contextPath}" />
<c:import var="head" url="include-style-script.jsp" />
<c:import var="footer" url="include-footer.jsp" />
<c:import var="head_banner" url="include-head-bar.jsp" />
<html>
<head>
<title><spring:message code="inflight.page.title" /></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="跳蛙 航班" />
<meta name="keywords" content="跳蛙, jumkid, 航班, flight " />

<c:out value="${head}" escapeXml="false" />

<script type="text/javascript">
	function init() {	
		new $.JK.site.FlightSearchWidget({
			targetDiv: $('#flight-aircraft-search')
		}).show(true);
	};	
</script>

</head>

<body>

	<div id="basic_wrapper">
		<!--  Top main bar -->
		<c:out value="${head_banner}" escapeXml="false" />

		<div id="main_wrapper">

			<div id="main_panel">
					
				<div id="flight-aircraft-search">
				<!-- aircraft search  -->
				</div>
				
				<div id="flight-aircraft-tools">
				<!-- flight tools bar -->
					<div>Send alarm to</div>
				</div>
				
				<div id="flight-aircraf-info">
				<!-- flight aircraft info -->					
					
				</div>

			</div>

		</div>

	</div>

<c:out value="${footer}" escapeXml="false"/>

</body>

</html>