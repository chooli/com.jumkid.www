<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:set var="contextUrl" scope="request" value="${pageContext.servletContext.contextPath}"/>
<c:set var="locale" scope="request" value="${pageContext.response.locale}"/>
<header id="header">
    <div id="top_logo_bar_<c:out value="${locale}" />"><span style="margin-left:120px;font-size:12px;"><spring:message code="home.menu.slogan" /></span></div>
    <div id="top_horizontal_panel">
    	<div id="top-btn-home" class="s-top-horizontal-menu">
    		<img height="23px" src="<c:out value="${contextUrl}"/>/images/site/icon_home.png"/>
    	</div>
    	<sec:authorize access="isAuthenticated()">
			<div id="top-btn-dashboard" class="s-top-horizontal-menu"><spring:message code="home.menu.mytrip" /></div>
		</sec:authorize>
		<div id="top-btn-flight" class="s-top-horizontal-menu"><spring:message code="home.menu.flight" /></div>
		<div id="top-btn-itinerary" class="s-top-horizontal-menu"><spring:message code="home.menu.planyourtrip" /></div>
    	<div id="top-btn-contactus" class="s-top-horizontal-menu"><spring:message code="home.menu.contactus" /></div>
    </div>
    
    <div id="session_user_panel">
		<sec:authorize access="isAuthenticated()">
			<div style="background: url(<c:out value="${contextUrl}"/>/user/avatar/<sec:authentication property="principal.username"/>) no-repeat;background-size: 49px 49px;"></div>&nbsp;<sec:authentication property="principal.username"/>
			<button id="top-btn-signout"><spring:message code="home.menu.signout" /></button>
		</sec:authorize>
		<sec:authorize access="isAnonymous()">
			<button id="top-btn-signin"><spring:message code="home.menu.signinandup" /></button>
		</sec:authorize>
	</div>
	<div id="search_box">
		<input type="text" size="20" />
		<button id="search_button">&nbsp;</button>
	</div>
	<div id="session_lang_chooser">
    	<a href="#" onclick="$.JK.user.reload('en')">English</a>
    	<a href="#" onclick="$.JK.user.reload('zh_CN')">中文</a>
    </div>
</header>

<script>
	$(document).ready(function () {	
		
		$.JK.setContextUrl("<c:out value="${contextUrl}"/>");
		
		$.ajaxSetup({
			cache: false
		});
	
		$('#top-btn-home').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/home";
		});
		$('#top-btn-dashboard').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/dashboard";
		});
		$('#top-btn-flight').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/flight";
		});
		$('#top-btn-itinerary').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/blog/l/how_to_create_itinerary";
		});
		$('#top-btn-contactus').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/contactus";
		});
		$('#top-btn-signin').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/signin";
		});
		$('#top-btn-signout').bind('click', function(e){
			window.location = "<c:out value="${contextUrl}"/>/sign-out";
		});
		
		if(init){
			init();
		}
		
	});
	
</script>