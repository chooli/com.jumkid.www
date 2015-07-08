package com.jumkid.www.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jumkid.base.model.ServiceSession;
import com.jumkid.site.model.contact.IContactService;

@Controller
public class ContactUsController {

	protected final Log logger = LogFactory.getLog(this.getClass());
	
	private IContactService contactService;
	
	@RequestMapping(value="/contactus", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
    public String blogPage(HttpServletRequest request){
		ServiceSession sSession = new ServiceSession(false);
		
		try{
			
			sSession.setSuccess(true);
		
		} catch (Exception e) {
	       	sSession.setErrors( e.getMessage()!=null?e.getMessage():e.getClass().getName() );
	    }
	
		return "site/contact-page";
		
	}

	public IContactService getContactService() {
		return contactService;
	}

	public void setContactService(IContactService contactService) {
		this.contactService = contactService;
	}
	
}
