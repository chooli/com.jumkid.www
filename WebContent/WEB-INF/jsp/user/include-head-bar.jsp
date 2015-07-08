<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:set var="contextUrl" scope="request" value="${pageContext.servletContext.contextPath}"/>
<c:set var="locale" scope="request" value="${pageContext.response.locale}"/>
<header id="header">
    <div id="top_logo_bar_<c:out value="${locale}" />"><span style="margin-left:120px;font-size:12px;">{{welcomeMessage}}</span></div>
    <div id="dynamic_container">{{dialog-widget isConfirm=isConfirm callback=confirmCallback confirmMessage=confirmMessage}}{{media-enlarge-viewer}}{{top-waiting-drawer isWaiting=isWaiting}}</div>
	<div id="top_horizontal_panel">
		<div id="top-btn-home" class="s-top-horizontal-menu" onClick="javascript:window.location='<c:out value="${contextUrl}"/>/home'"><img height="23px" src="<c:out value="${contextUrl}"/>/images/site/icon_home.png"/></div>
		<sec:authorize access="isAuthenticated()">
			<div id="top-btn-myspace" class="s-top-horizontal-menu-focus"><spring:message code="home.menu.mytrip" /></div>
		</sec:authorize>
  		<div id="top-btn-contactus" class="s-top-horizontal-menu" onClick="javascript:window.location='<c:out value="${contextUrl}"/>/contactus'"><spring:message code="home.menu.contactus" /></div>
 	</div>
	<div id="session_user_panel">
		<sec:authorize access="isAuthenticated()">
			<div style="background: url(<c:out value="${contextUrl}"/>/user/avatar/<sec:authentication property="principal.username"/>) no-repeat;background-size: 49px 49px;width:49px; height:49px;">&nbsp;</div>&nbsp;<sec:authentication property="principal.username"/>
			<button onClick="javascript:window.location='<c:out value="${contextUrl}"/>/sign-out';"><spring:message code="home.menu.signout" /></button>
		</sec:authorize>
		<sec:authorize access="isAnonymous()">
			<button onClick="javascript:window.location='<c:out value="${contextUrl}"/>/signin';"><spring:message code="home.menu.signinandup" /></button>
		</sec:authorize>
	</div>
</header>