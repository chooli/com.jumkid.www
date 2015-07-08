package com.jumkid.www.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jumkid.base.model.Command;
import com.jumkid.base.model.ServiceSession;
import com.jumkid.live.flightaware.IPassengerFlightService;

@Controller
public class FlightController {

	protected final Log logger = LogFactory.getLog(this.getClass());
	
	private IPassengerFlightService passengerFlightService;
	
	/**
	 * 
	 * @param keyword
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/flight", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
    public String flightPage(HttpServletRequest request){		
		return "site/inflight-page";
	}
	
	/**
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value="/flight/inflight/{ident}", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
	@ResponseBody
    public String inFlightInfo(@PathVariable("ident") String ident){
		ServiceSession sSession = new ServiceSession(false);
		
			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("ident", ident);
			
			try{
				Command cmd = passengerFlightService.execute( new Command("flightmanager", "loadInFlightInfo", params) );
				
				return sSession.wrapCommand(cmd, "inFlightInfo", false).getJsonResult();
				
			}catch (Exception e) {
            	sSession.setErrors(e.getLocalizedMessage());
            }
			
			return sSession.toServiceJSONResult();
	}
	
	public IPassengerFlightService getPassengerFlightService() {
		return passengerFlightService;
	}

	public void setPassengerFlightService(IPassengerFlightService passengerFlightService) {
		this.passengerFlightService = passengerFlightService;
	}
	
	
}
