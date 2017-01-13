package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.UserMapper;
import com.app.entity.User;
import com.app.service.UserService;
import com.app.util.appException;

import net.sf.json.JSONObject;



@Service("UserServiceImpl")
public class UserServiceImpl implements UserService{

	@Autowired
	public UserMapper userMapper;
	
	@Override
	public String login(String UserName){
		return userMapper.login(UserName);
	}

	@Override
	public List<User> getUser(){
		return userMapper.getUser();
	}
	
	@Override
	public User getUserByUserName(String userName){
		return userMapper.getUserByUserName(userName);
	}
	
	
	@Override
	public void addUser(User user){
		if(userMapper.login(user.getUserName())==null)
		  userMapper.addUser(user);
	}
	
	@Override
	public void updateUser(User user){
		userMapper.updateUser(user);
	}
	
	@Override
	public void deleteUserList(List<Integer> idList){
		userMapper.deleteUser(idList);
	}
	
	@Override
	public int getCount(){
		return this.getUser().size();	
	}
	
	@Override
	public List<User> getPageUser(int start,int limit){
		List<User> list = userMapper.getPageUser(start, limit);
		return list;
	}
	
	@Override
	public String getPageUserJson(int start,int limit){
		List<User> list = this.getPageUser(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<User> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public boolean isAdmin(String name){
		String n = userMapper.getGroup(name);
		boolean admin = true;
		if(n.equals("管理员")){
		}else{
			admin = false;
		}
		return admin;
	}
}
