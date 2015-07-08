package com.jumkid.www.controller.helper;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;

import com.jumkid.base.model.Command;
import com.jumkid.base.util.Constants;
import com.jumkid.site.model.flyer.Flyer;
import com.jumkid.site.model.flyer.IFlyerService;
import com.jumkid.site.model.product.IProductService;
import com.jumkid.site.model.product.Product;

public class FlyerRequestHelper extends CommonRequestHelper {
	
	protected String MODULE = "flyer";
	
	private IFlyerService flyerService;
	
	private IProductService productService;
	
	public List<Flyer> getRecentFlyers(HttpServletRequest request){
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("keyword", "*");
		params.put("scope", Constants.PUBLIC);
		params.put("start", 0);
		params.put("limit", pageSize);
		
		Command cmd = flyerService.execute( new Command("flyerManager", "search", params) );
		@SuppressWarnings("unchecked")
		Page<Flyer> page = (Page<Flyer>)cmd.getResults().get("page");
		
		return page.getContent();
	}
	
	public void getProducts(Flyer flyer){
		if(flyer.getRefProducts()==null) return;
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("scope", Constants.PUBLIC);
		Command cmd;
		
		synchronized(flyer){
			for(String uuid : flyer.getRefProducts()){
				params.put("uuid", uuid);
				cmd = getProductService().execute(new Command("productManager", "load", params));
				Product product = (Product)cmd.getResults().get("product");
				flyer.addProduct(product);
			}
		}
				
	}

	public IFlyerService getFlyerService() {
		return flyerService;
	}

	public void setFlyerService(IFlyerService flyerService) {
		this.flyerService = flyerService;
	}

	public IProductService getProductService() {
		return productService;
	}

	public void setProductService(IProductService productService) {
		this.productService = productService;
	}
	
	

}
