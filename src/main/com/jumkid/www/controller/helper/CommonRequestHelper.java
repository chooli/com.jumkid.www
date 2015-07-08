package com.jumkid.www.controller.helper;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.domain.Page;

import com.jumkid.base.model.Command;
import com.jumkid.site.model.file.IMediaFileService;
import com.jumkid.site.model.social.ISocialCommentService;
import com.jumkid.site.model.social.SocialComment;

public class CommonRequestHelper {
	
	protected final Log logger = LogFactory.getLog(this.getClass());
	
	protected String MODULE = null;

	protected Integer pageSize;
	
	private ISocialCommentService socialCommentService;
	
	private IMediaFileService mediaFileService;
	
	public void getHistoryComments(String moduleRefId, HttpServletRequest request){
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		String _start = request.getParameter("start");
		Integer start = _start!=null ? Integer.parseInt(_start):0;
		String _limit = request.getParameter("limit");
		Integer limit = _limit!=null ? Integer.parseInt(_limit):20;
		params.put("start", start);
		params.put("limit", limit);
		
		params.put("module", MODULE);
		params.put("moduleRefId", moduleRefId);
		
		Command cmd = socialCommentService.execute( new Command("socialCommentManager", "load", params) );
		@SuppressWarnings("unchecked")
		Page<SocialComment> page = (Page<SocialComment>)cmd.getResults().get("page");
		
		request.setAttribute("comments", page.getContent());
		
	}

	public ISocialCommentService getSocialCommentService() {
		return socialCommentService;
	}

	public void setSocialCommentService(ISocialCommentService socialCommentService) {
		this.socialCommentService = socialCommentService;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public IMediaFileService getMediaFileService() {
		return mediaFileService;
	}

	public void setMediaFileService(IMediaFileService mediaFileService) {
		this.mediaFileService = mediaFileService;
	}
	
	
	
}
