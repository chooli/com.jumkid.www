<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import var="head_banner" url="include-head-bar.jsp" />
<c:set var="user" scope="request" value="${user}"/>
<html>

    <head>
        <title>跳蛙 | 登陆</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content="跳蛙 我的旅行" />
        <meta name="keywords" content="跳蛙 jumkid" />
        
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/user-darkgray.min.css" />
        
        <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-1.11.2.min.js"></script>
    		   		   		   		   		
   		<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/admin/locale/zh_cn.js"></script>
            			
    </head>

<body>

<div>
    <!--  Top main bar -->
    <c:out value="${head_banner}" escapeXml="false"/>
	
	<div id="main_wrapper">

        <div id="main_panel" style="margin-top:36px;padding: 36px;">
        	<span style="font-size:20px;">
        	<img src="../../images/site/icon-ok.png" height="68px;"/><br/><br/>
        	<p><c:out value="${user.username}" /> 您的邮件地址已确认成功，您可以返回登陆页面登陆并继续使用跳蛙网站服务了  <a href="http://www.jumkid.com/zh/signin">去登陆页面</a></p>
        	</span>
        	
        </div>
	   
	</div>	    
	
</div>

</body>

</html>
 