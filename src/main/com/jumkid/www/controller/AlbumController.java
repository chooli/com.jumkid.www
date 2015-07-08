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
import com.jumkid.site.model.album.Album;
import com.jumkid.site.model.album.IAlbumService;
import com.jumkid.www.controller.helper.AlbumRequestHelper;

@Controller
public class AlbumController {

	protected final Log logger = LogFactory.getLog(this.getClass());
	
	private IAlbumService albumService;
	
	private AlbumRequestHelper albumRequestHelper;
	
	/**
	 * 
	 * @param keyword
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/album/l/{uuid}", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
    public String albumPage(@PathVariable("uuid") String uuid, HttpServletRequest request){
		ServiceSession sSession = new ServiceSession(false);
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("uuid", uuid);
		try {
			Command cmd = albumService.execute( new Command("albumManager", "load", params) );
			Album album = (Album)cmd.getResults().get("album");

			albumRequestHelper.getRecentAlbums(request);
			
			albumRequestHelper.getAttachmentFiles(album);
			
			albumRequestHelper.getHistoryComments(album.getUuid(), request);
			
			request.setAttribute("album", album);
			
			sSession.setSuccess(true);
			
		} catch (Exception e) {
	       	sSession.setErrors( e.getMessage()!=null?e.getMessage():e.getClass().getName() );
	    }
		
		return "site/album-page";
		
	}
	
	public IAlbumService getAlbumService() {
		return albumService;
	}

	public void setAlbumService(IAlbumService albumService) {
		this.albumService = albumService;
	}

	public AlbumRequestHelper getAlbumRequestHelper() {
		return albumRequestHelper;
	}

	public void setAlbumRequestHelper(AlbumRequestHelper albumRequestHelper) {
		this.albumRequestHelper = albumRequestHelper;
	}
	
	
}
