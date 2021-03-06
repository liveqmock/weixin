
package com.micro.rent.biz.personal.serivice;

import static org.junit.Assert.assertNotNull;

import com.micro.rent.biz.map.baidu.MapPoint;
import com.micro.rent.biz.myrent.vo.MatchResultWrap;
import com.micro.rent.biz.personal.service.FavoritesService;
import com.micro.rent.biz.personal.vo.HouseVo;
import com.micro.rent.biz.weixin.service.impl.LocationEventMessageHandler;
import com.micro.rent.dbaccess.entity.myrent.HouseInfo;
import com.micro.rent.dbaccess.entity.personal.Favorites;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import support.AbstractSpringContextTestSupport;

/**
 * @Description: 
 * 
 * @author dell
 * @date 2014-8-28
 * @version TODO
 */
@WebAppConfiguration
public class FavoritesServiceTestcase extends AbstractSpringContextTestSupport {
	
	@Autowired
	private FavoritesService favoritesService;
/*	@Test
	public void queryFavoritesList() {
		
		List<HouseInfo> lstHouseInfo = favoritesService.queryFavoritesList("wx111111");
		
		if (lstHouseInfo != null && !lstHouseInfo.isEmpty()) {
			log.debug("lstHouseInfo:" + lstHouseInfo.size());
		}
	}
	
	@Test
	public void addCollect() {
		Favorites favorites = new Favorites();
		
		favorites.setHouseId("h1111");
		favorites.setProjectId("pro111");
		favorites.setWeixinId("wx111111");
		
		favoritesService.addCollect(favorites);
	}
	@Test
	public void batachAddCollect() {
		for (int i = 1; i <= 5; i++) {
			Favorites favorites = new Favorites();
			
			favorites.setHouseId("31010021000" + i);
			favorites.setProjectId("31010021");
			favorites.setWeixinId("wx111111");
			
			favoritesService.addCollect(favorites);
		}
	}
	
	@Test
	public void deleteCollect() {
		favoritesService.deleteCollect("111", "xxxx");
	}
	@Test
	public void queryOneFavoritesByHouseIdAndWeixinId() {
		
	}
	*/
	@Test
	public void queryCollectList() {
		String weixinId="oYaa9t_eipZkGBnhZ0ay2E8F2D5s";
		MapPoint mapPoint=new MapPoint("116.5","36.5");
	//	LocationEventMessageHandler.lrumap.put(weixinId, mapPoint);
		List<HouseVo> wrap=favoritesService.queryCollectList(weixinId);//mapPoint,
		assertNotNull(wrap);
	}
	
	
	
	
}

