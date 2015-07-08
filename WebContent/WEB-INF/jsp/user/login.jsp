<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<c:import var="head_banner" url="include-head-bar.jsp" />
<html>

    <head>
        <title><spring:message code="home.page.Signin" /></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content="Jumkid Innovation" />
        <meta name="keywords" content="Jumkid Innovation" />
        
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/user-darkgray.min.css" />
        
        <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-1.11.2.min.js"></script>
    		   		   		
    	<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember-template-compiler.js"></script>  		   		
    	<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember.min.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/emberjs/ember-data.js"></script>
   		   		
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/admin/locale/en.js"></script>
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/app-login.js"></script>
      
      	<script>
  		<!--

	  		App.ready = function() {
				App.DataAccess.setup("${pageContext.request.contextPath}", "");
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

        <div id="main_panel">
        	<!-- login template -->
        	{{outlet}}
			<!-- login template -->
        </div>
	   
	</div>	    
	
</div>
</script>

</body>

</html>
 