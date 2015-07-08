package com.jumkid.www.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jumkid.base.model.Command;
import com.jumkid.base.model.ServiceSession;
import com.jumkid.site.model.flyer.Flyer;
import com.jumkid.site.model.flyer.IFlyerService;
import com.jumkid.www.controller.helper.FlyerRequestHelper;

@Controller
public class FlyerController {

	protected final Log logger = LogFactory.getLog(this.getClass());
	
	private IFlyerService flyerService;
	
	private FlyerRequestHelper flyerRequestHelper;
	
	/**
	 * 
	 * @param keyword
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/flyer/l/{filename}", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
    public String flyerPage(@PathVariable("filename") String filename, HttpServletRequest request){
		ServiceSession sSession = new ServiceSession(false);
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("filename", filename);
		try {
			Command cmd = flyerService.execute( new Command("flyerManager", "load", params) );
			Flyer flyer = (Flyer)cmd.getResults().get("flyer");

			flyerRequestHelper.getRecentFlyers(request);
			
			flyerRequestHelper.getProducts(flyer);
			
			flyerRequestHelper.getHistoryComments(flyer.getUuid(), request);
			
			request.setAttribute("flyer", flyer);
			
			sSession.setSuccess(true);
			
		} catch (Exception e) {
	       	sSession.setErrors( e.getMessage()!=null?e.getMessage():e.getClass().getName() );
	    }
		
		return "site/flyer-page";
		
	}

	public FlyerRequestHelper getFlyerRequestHelper() {
		return flyerRequestHelper;
	}

	public void setFlyerRequestHelper(FlyerRequestHelper flyerHelper) {
		this.flyerRequestHelper = flyerHelper;
	}

	public IFlyerService getFlyerService() {
		return flyerService;
	}

	public void setFlyerService(IFlyerService flyerService) {
		this.flyerService = flyerService;
	}
	
}
