package com.micro.rent.common.web.resolver;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

public class CustomerAcceptHeaderLocaleResolver extends AcceptHeaderLocaleResolver {
	private Locale myLocal;

	public Locale resolveLocale(HttpServletRequest request) {
		return myLocal;
	}

	public void setLocale(HttpServletRequest request,
			HttpServletResponse response, Locale locale) {
		if (locale == null) {
			locale = Locale.CHINESE;
		}
		myLocal = locale;
	}
}
