package com.app.service;

import java.util.List;

import com.app.entity.User;
import com.app.util.appException;

public interface UserService {
	
	public String login(String user_name);
	
	
	/** 显示所有用户信息*/
	public List<User> getUser();
	
	public User getUserByUserName(String userName);
	
	
	
	/** 添加用户 */
	public void addUser(User user);
	
	/**更新用户*/
	public void updateUser(User user);
	
	/**删除用户*/
	public void deleteUserList(List<Integer> idList);
	
	public int getCount();
	
	public List<User> getPageUser(int start,int list);
	
	public String getPageUserJson(int start,int list);
	
	public String PageListToJson(List<User> list);
	
	/**判断用户是否为管理员*/
	public boolean isAdmin(String name);
}
