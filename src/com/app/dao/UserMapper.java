package com.app.dao;

import java.util.List;

import com.app.entity.User;

public interface UserMapper {
	
	/** 根据用户名查询密码登录 */
	public String login(String user_name);
		
	/** 查询所有用户 */
	public List<User> getUser();
	
	/**根据用户名查询*/
	public User getUserByUserName(String user_name);
	
	/** 添加用户  */
	public void  addUser(User user);
	
	/** 修改用户 */
	public  void updateUser(User user);
	
	/** 删除用户*/
	public void deleteUser(List<Integer> idList);
	
	public List<User> getPageUser(int param1,int param2);
	
	/**根据用户名查询权限*/
	public String getGroup(String user_name);
}
