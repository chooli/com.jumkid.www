package com.jumkid.www.controller;

import java.nio.channels.FileChannel;
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
import com.jumkid.site.controller.file.ResponseMediaFileWriter;
import com.jumkid.site.model.blog.Blog;
import com.jumkid.site.model.blog.IBlogService;
import com.jumkid.www.controller.helper.BlogRequestHelper;


@Controller
public class BlogController {

	protected final Log logger = LogFactory.getLog(this.getClass());
	
	private IBlogService blogService;
		
	private ResponseMediaFileWriter responseMFileWriter;
	
	private BlogRequestHelper blogRequestHelper;
	
	/**
	 * 
	 * @param keyword
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/blog/l/{filename}", method=RequestMethod.GET, produces={"application/json; charset=UTF-8"})
    public String blogPage(@PathVariable("filename") String filename, HttpServletRequest request){
		ServiceSession sSession = new ServiceSession(false);
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("filename", filename);
		try {
			Command cmd = blogService.execute( new Command("blogManager", "retrieve", params) );
			Blog blog = (Blog)cmd.getResults().get("blog");
			FileChannel fc = (FileChannel)cmd.getResults().get("fileChannel");
			
			//read text from file and set to content
			String content = responseMFileWriter.readSmallTextfile(fc);
			blog.setContent(content);
			
			blogRequestHelper.getRecentBlogs(request);
			
			blogRequestHelper.getAttachmentFiles(blog, request);
			
			blogRequestHelper.getHistoryComments(blog.getUuid(), request);
			
			request.setAttribute("blog", blog);
			
			sSession.setSuccess(true);
			
		} catch (Exception e) {
	       	sSession.setErrors( e.getMessage()!=null?e.getMessage():e.getClass().getName() );
	    }
		
		return "site/blog-page";
		
	}
	
	public IBlogService getBlogService() {
		return blogService;
	}

	public void setBlogService(IBlogService blogService) {
		this.blogService = blogService;
	}

	public ResponseMediaFileWriter getResponseMFileWriter() {
		return responseMFileWriter;
	}

	public void setResponseMFileWriter(ResponseMediaFileWriter responseMFileWriter) {
		this.responseMFileWriter = responseMFileWriter;
	}



	public BlogRequestHelper getBlogRequestHelper() {
		return blogRequestHelper;
	}



	public void setBlogRequestHelper(BlogRequestHelper blogRequestHelper) {
		this.blogRequestHelper = blogRequestHelper;
	}
	
}
