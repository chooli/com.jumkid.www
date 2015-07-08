<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="locale" scope="request" value="${pageContext.response.locale}"/>

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/site-darkgray.min.css" />

    <!-- 3th party libs -->
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-1.11.2.min.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-ui-1.11.2/jquery-ui.min.css" media="screen"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-ui-1.11.2/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jsrender.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/jquery-validation/jquery.validate.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/prettify/prettify.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/prettify/prettify.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/video-js/video.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/video-js/video-js.min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/anythingSlider/css/anythingslider.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/anythingSlider/js/jquery.anythingslider.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/3pty-libs/jquery/anythingSlider/js/jquery.anythingslider.video.min.js"></script>
   
   <!-- Google api -->
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=3&language=<c:out value="${locale}" />&signed_in=false"></script>

    <!-- Site Apps -->
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/admin/locale/<c:out value="${locale}" />.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/scripts/site.js"></script>
