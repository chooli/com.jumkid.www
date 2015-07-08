<%@ page contentType="text/html;charset=utf-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<footer id="footer">	
	<div>
		<ul>
			<li><a href="<c:out value="${pageContext.request.contextPath}"/>/blog/l/about_jumkid">关于跳蛙</a></li>
			<li><a href="<c:out value="${pageContext.request.contextPath}"/>/blog/l/FAQ">FAQ常见问答</a></li>
			<li>博客列表</li>
		</ul>
	</div>
	
	<div>
		<ul>
			<li><a target="_blank" href="<c:out value="${pageContext.request.contextPath}"/>/blog/l/privacy_protection">个人隐私保护</a></li>
			<li></li>
			<li>Power by Jumkid Innovation</li>
		</ul>
	</div>
	
	<div>
		<ul>
			<li>Language</li>
			<li><a href="#" onclick="$.JK.user.reload('en')">English</a></li>
			<li><a href="#" onclick="$.JK.user.reload('zh_CN')">中文</a></li>
		</ul>
	</div>
	
</footer>