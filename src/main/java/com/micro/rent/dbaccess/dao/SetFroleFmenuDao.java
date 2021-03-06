package com.micro.rent.dbaccess.dao;

import com.micro.rent.dbaccess.entity.SetFroleFmenu;


/**
 * @Description 角色菜单数据访问接口
 * @author 
 * @date 2013-03-01
 * @version 1.0
 */

public interface SetFroleFmenuDao {
	
	/**
	 * @Description 插入新记录
	 * @param setRoleMenu
	 * @author 
	 */
	void insert(SetFroleFmenu setRoleMenu);
	
	
	/**
	 * @Description 删除当前用户对应的所有菜单记录
	 * @param roleId
	 * @return
	 * @author 
	 */
	void deleteByRoleId(String roleId);
	
	/**
	 * @Description 更新记录
	 * @param setRoleMenu
	 * @author 
	 */
	void updateByPrimaryKeySelective(SetFroleFmenu setRoleMenu);
	
	

}
