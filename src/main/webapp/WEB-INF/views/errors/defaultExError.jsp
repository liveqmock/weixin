<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
	<title>异常</title>
</head>
<body>
	<%@ include file="errorHeader.jsp"%>
	
	<h3 style="text-align:center;margin-top:10%;">
		<span class="text-error">${errorType}</span>
		<br/><br/><h4 style="text-align:center;">${message}</h4>
	</h3>
	<%@ include file="errorFooter.jsp"%>
</body>
</html>