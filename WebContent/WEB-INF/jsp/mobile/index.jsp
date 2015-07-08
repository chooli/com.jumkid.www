<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="itineraryDate" class="java.util.Date"/>
<c:set var="contextUrl" scope="request" value="${pageContext.servletContext.contextPath}"/>
<c:set var="module" scope="request" value="${module}"/>
<c:set var="trip" scope="request" value="${trip}"/>
<c:set var="itineraries" scope="request" value="${itineraries}"/>
<html>

    <head>
        <title>跳蛙</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content="跳蛙Jumkid行程管理为你提供个人的旅行计划工具，当你把旅行看作是一次生活意义的探索，一次学习过程，一次有目的计划的活动，跳蛙就是你的得力助手工具" />
	    <meta name="keywords" content="跳蛙, jumkid, 旅行, trip, 行程计划, 行程助手, Itineray, 影集, album, 旅行博客, blog, 旅游产品, travel flyer" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/mobile-blue.min.css" />
        
        <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-1.11.2.min.js"></script>
    	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery-mobile/jquery.mobile-1.4.5.min.css" media="screen"/>
    	<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery-mobile/jquery.mobile-1.4.5.min.js"></script>
    			
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/admin/locale/en.js"></script>   		           	
		
    </head>

<body>

<div data-role="page">

	<div data-role="header">
		<a href="<%=request.getContextPath()%>/dashboard" data-icon="bars">Menu</a>
	    <h1><img src="../../images/site/logo-top-bar.png" height="43px;"/></h1>
	    <a href="<%=request.getContextPath()%>/signin" data-icon="user">Login</a>
	</div><!-- /header -->
		
	<div role="main" class="ui-content">
		<c:choose>
        		<c:when test="${module == 'trip'}">
        			<h2><c:out value="${trip.title}"/></h2>
        			<div>从 <fmt:formatDate pattern="yyyy-MM-dd" value="${trip.departureDate}" /> 到 <fmt:formatDate pattern="yyyy-MM-dd" value="${trip.returnDate}" /></div>			
        			<div>共 <c:out value="${trip.duration}"/> 天 | 大人 <c:out value="${trip.numOfAdult}"/> 位 <c:if test="${not empty trip.numOfChild}">小孩 <c:out value="${trip.numOfChild}"/> 位</c:if></div>
        		
        			<div class="di">&nbsp;</div>
        		
        		    <div>
        		    	<c:set var="departureDate" value="${trip.departureDate}"/>
        		    	<c:forEach items="${itineraries}" var="itinerary" varStatus="loop">
        		    		<jsp:setProperty name="itineraryDate" property="time" value="${departureDate.time + 60*60*24*1000*(loop.index)}" />
        		    		<div data-role="collapsible" data-collapsed="false" data-theme="b">
        		    			<h2>第 <c:out value="${loop.index + 1}"/> 天 <fmt:formatDate pattern="yyyy-MM-dd" value="${itineraryDate}" /> <fmt:formatDate pattern="EE" value="${itineraryDate}" /> </h2> 
        		    			       		    			
        		    			<c:set var="attributeValues" value="${itinerary.attributeValues}"/>
        		    			<c:set var="attributeTimes" value="${itinerary.attributeTimes}"/>
        		    			<c:forEach items="${itinerary.attributeTypes}" var="attributeType" varStatus="loop">
        		    				<img src="../../images/admin/icon-itinerary-<c:out value="${attributeType}"/>.png" style="vertical-align: middle;" />
        		    				<fmt:parseDate value="${attributeTimes[loop.index]}" var="attributeTime" pattern="HH:mm" />
        		    				<strong><fmt:formatDate pattern="hh:mm a" value="${attributeTime}" /></strong>
        		    				<c:out value="${attributeValues[loop.index]}"/>
        		    				<div class="di">&nbsp;</div>
        		    				
        		    			</c:forEach>
        		    			        		    			
        		    		</div>
        		    	</c:forEach>
        		    </div>
        		   
        		</c:when>
        	</c:choose>  
	</div><!-- /content -->
        	        
    <div data-role="footer">
		<h3>&copy; 2015 copyright by Jumkid 跳蛙网版权所有</h3>
	</div><!-- /footer -->    	  
	
</div><!-- /page -->

</body>

</html>
 