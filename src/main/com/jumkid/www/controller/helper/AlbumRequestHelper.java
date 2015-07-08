package com.jumkid.www.controller.helper;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;

import com.jumkid.base.model.Command;
import com.jumkid.base.util.Constants;
import com.jumkid.site.model.album.Album;
import com.jumkid.site.model.album.IAlbumService;
import com.jumkid.site.model.file.MediaFile;

public class AlbumRequestHelper extends CommonRequestHelper{
	
	protected String MODULE = "album";
	
	private IAlbumService albumService;
	
	public List<Album> getRecentAlbums(HttpServletRequest request){
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("keyword", "*");
		params.put("scope", Constants.PUBLIC);
		params.put("start", 0);
		params.put("limit", pageSize);
		
		Command cmd = albumService.execute( new Command("albumManager", "search", params) );
		@SuppressWarnings("unchecked")
		Page<Album> page = (Page<Album>)cmd.getResults().get("page");
		
		return page.getContent();
	}
	
	public void getAttachmentFiles(Album album){
		if(album.getAttachments()==null) return;
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("scope", Constants.PUBLIC);
		Command cmd;
		
		synchronized(album){
			for(String uuid : album.getAttachments()){
				params.put("uuid", uuid);
				cmd = getMediaFileService().execute(new Command("fileManager", "load", params));
				MediaFile mfile = (MediaFile)cmd.getResults().get("mfile");
				album.addAttachmentFile(mfile);
			}
		}
				
	}

	public IAlbumService getAlbumService() {
		return albumService;
	}

	public void setAlbumService(IAlbumService albumService) {
		this.albumService = albumService;
	}
	
}
