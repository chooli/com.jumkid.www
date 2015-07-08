package com.jumkid.www.controller;

/* 
 * This software is written by Jumkid Ltd. and subject
 * to a contract between Jumkid and its customer.
 *
 * This software stays property of Jumkid unless differing
 * arrangements between Jumkid and its customer apply.
 *
 * 
 * http://www.jumkid.com
 * mailto:info@jumkid.com
 *
 * (c)2014 Jumkid Innovation. All rights reserved.
 *
 *
 */

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jumkid.base.model.ServiceSession;
import com.jumkid.site.model.album.Album;
import com.jumkid.site.model.blog.Blog;
import com.jumkid.site.model.file.MediaFile;
import com.jumkid.site.model.flyer.Flyer;
import com.jumkid.www.controller.helper.AlbumRequestHelper;
import com.jumkid.www.controller.helper.BlogRequestHelper;
import com.jumkid.www.controller.helper.FlyerRequestHelper;

@Controller
public class HomeController {
	
	protected final Log logger = LogFactory.getLog(this.getClass());
			
	private BlogRequestHelper blogRequestHelper;
	
	private AlbumRequestHelper albumRequestHelper;
	
	private FlyerRequestHelper flyerRequestHelper;
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/signin", method=RequestMethod.GET)
	public String login(HttpServletRequest request){
		return "site/signin";
	}
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public String home(HttpServletRequest request){
		ServiceSession sSession = new ServiceSession(false);		
		try{
			
			//cacheSiteConfig(request);
			
			//set recent contents to request
			List<Blog> blogs = blogRequestHelper.getRecentBlogs(request);
			List<Album> albums = albumRequestHelper.getRecentAlbums(request);
			List<Flyer> flyers = flyerRequestHelper.getRecentFlyers(request);
			
			List<MediaFile> _all = new ArrayList<MediaFile>();
			_all.addAll(flyers);
			_all.addAll(blogs);
			_all.addAll(albums);
			
			
			Collections.sort(_all, new Comparator<MediaFile>(){
				@Override
		        public int compare(MediaFile m1, MediaFile m2) {
		            //You should ensure that list doesn't contain null values!
		            return m2.getCreatedDate().compareTo(m1.getCreatedDate());
		        }
			});
									
			request.setAttribute("mfiles", _all);
		
		}catch(Exception e){
			e.printStackTrace();
            sSession.setErrors(e.getLocalizedMessage());
		}
		
		return "site/index";
	}
	
	public BlogRequestHelper getBlogRequestHelper() {
		return blogRequestHelper;
	}

	public void setBlogRequestHelper(BlogRequestHelper blogRequestHelper) {
		this.blogRequestHelper = blogRequestHelper;
	}

	public AlbumRequestHelper getAlbumRequestHelper() {
		return albumRequestHelper;
	}

	public void setAlbumRequestHelper(AlbumRequestHelper albumRequestHelper) {
		this.albumRequestHelper = albumRequestHelper;
	}

	public FlyerRequestHelper getFlyerRequestHelper() {
		return flyerRequestHelper;
	}

	public void setFlyerRequestHelper(FlyerRequestHelper flyerRequestHelper) {
		this.flyerRequestHelper = flyerRequestHelper;
	}

	class CreatedDateComparator implements Comparator<MediaFile>{
		 
	    @Override
	    public int compare(MediaFile mf1, MediaFile mf2) {
	        if(mf1.getCreatedDate().after(mf1.getCreatedDate())){
	            return 1;
	        } else {
	            return -1;
	        }
	    }
	}
	
}
