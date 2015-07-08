package com.jumkid.www.controller.helper;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;

import com.jumkid.base.model.Command;
import com.jumkid.base.util.Constants;
import com.jumkid.site.model.blog.Blog;
import com.jumkid.site.model.blog.IBlogService;
import com.jumkid.site.model.file.MediaFile;

public class BlogRequestHelper extends CommonRequestHelper{
		
	protected String MODULE = "blog";
	
	private IBlogService blogService;
	
	public List<Blog> getRecentBlogs(HttpServletRequest request){
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("keyword", "*");
		params.put("scope", Constants.PUBLIC);
		params.put("start", 0);
		params.put("limit", pageSize);
		
		Command cmd = blogService.execute( new Command("blogManager", "search", params) );
		@SuppressWarnings("unchecked")
		Page<Blog> page = (Page<Blog>)cmd.getResults().get("page");
		
		//if(page.hasNext()) request.setAttribute("more", true);
		//request.setAttribute("blogs", page.getContent());
		return page.getContent();
	}	
	
	public void getAttachmentFiles(Blog blog, HttpServletRequest request){
		if(blog.getAttachments()==null) return;
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("scope", Constants.PUBLIC);
		Command cmd;
		
		synchronized(blog){
			for(String uuid : blog.getAttachments()){
				params.put("uuid", uuid);
				cmd = getMediaFileService().execute(new Command("fileManager", "load", params));
				MediaFile mfile = (MediaFile)cmd.getResults().get("mfile");
				blog.addAttachmentFile(mfile);
			}
		}
				
	}
	
	public IBlogService getBlogService() {
		return blogService;
	}

	public void setBlogService(IBlogService blogService) {
		this.blogService = blogService;
	}
	
}
