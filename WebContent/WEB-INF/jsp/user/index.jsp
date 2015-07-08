<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:import var="head_banner" url="include-head-bar.jsp" />
<c:set var="locale" scope="request" value="${pageContext.response.locale}"/>
<html>

    <head>
        <title><spring:message code="home.page.title" /></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content="跳蛙 我的旅行" />
        <meta name="keywords" content="跳蛙 jumkid" />
        
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/user-darkgray.min.css" media="screen"/>
        
        <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-1.11.2.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-ui-1.11.2/jquery-ui.min.css" media="screen"/>
    	<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-ui-1.11.2/jquery-ui.min.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/select2/select2.css" media="screen"/>
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/select2/select2.min.js"></script>

		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember-template-compiler.js"></script> 
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember.min.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember-data.js"></script>
   		
   		<!-- 3th party libs  -->
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-number/jquery.number.min.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/pdfobject.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/video-js/video.js"></script>
   		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/video-js/video-js.min.css" media="screen"/>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/prettify/prettify.js"></script>
   		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/prettify/prettify.css" media="screen"/>
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/moment-with-locales.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/pikaday/pikaday.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/pikaday/pikaday.css" media="screen"/>
		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/print-preview/jquery.print-preview.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/print-preview/css/print-preview.css" media="screen"/>
   		
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/admin/locale/<c:out value="${locale}" />.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/app.js"></script>
   		        
      
      	<script>
  		<!--

	  		App.ready = function() {
  				App.DataAccess.setup("${pageContext.request.contextPath}", "", "<sec:authentication property="principal.username"/>");
  		}
	  	  		
  		-->
  		</script>
		
    </head>

<body>

<script type="text/x-handlebars">
<div>
    <!--  Top main bar -->
    <c:out value="${head_banner}" escapeXml="false"/>
	
	<div id="main_wrapper">
  		
  		{{navigation-menu property="nav-menu" menuItems=menuItems selectedMenu=selectedMenu}}
			
        <div id="main_panel">
        	<!-- main panel -->
        	{{outlet}}
        </div>
	   
	</div>	    

</div>
</script>

</body>

</html>
 