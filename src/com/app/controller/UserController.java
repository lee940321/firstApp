package com.app.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.app.entity.User;
import com.app.service.UserService;
import com.app.util.MD5;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@Controller("UserController")
@RequestMapping("/user")
public class UserController {
	
	

	@Resource(name="UserServiceImpl")
	public UserService userService;
	
	/**用户登录*/
	@RequestMapping("/login")
	@ResponseBody
	public  JSONObject login(String UserName,String UserPwd){
		String pass = userService.login(UserName);
		String userPwd = MD5.stringMD5(UserPwd);
		boolean admin = userService.isAdmin(UserName);
		JSONObject obj=new JSONObject();
		System.out.println(userPwd);
			if(pass!=null&&pass.equals(userPwd)){
				obj.put("success", true);
				obj.put("msg", "User authenticated!");
				obj.put("admin", admin);
				return obj;
			}else{
				obj.put("success", false);
				obj.put("msg", "Incorrect user or password");
				return obj;
			}
		
	}
	
	/**用户注销*/
	@RequestMapping("/logout")
	@ResponseBody
	public JSONObject logout(){
		
		JSONObject obj=new JSONObject();
		obj.put("success", true);
		obj.put("msg", "logout");
		return obj;
	}
	
	/**用户分页显示显示*/
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getUser(HttpServletRequest request,HttpServletResponse response){
		
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
		
		return userService.getPageUserJson(start, limit);
		
	}
	
	/**添加用户
	 * @return */
	@RequestMapping(value="/add",produces="text/html;charset=UTF-8")
	@ResponseBody
	public void addUser(HttpServletRequest request,PrintWriter writer){
		User user = new User();
		User u= userService.getUserByUserName(request.getParameter("userName"));
		user.setUserName(request.getParameter("userName"));;
		user.setUserPwd(request.getParameter("pass"));
		user.setGroup(request.getParameter("group"));
		if(u==null)
		{
			userService.addUser(user);
			writer.write("{success:true, msg:'新增成功!'}");
			
		}else{
			writer.write("{success:false, msg:'新增失败!'}");
		}
	}
	
	/** 删除用户
	 * @return */
	@RequestMapping("/delete")
	@ResponseBody
	public JSONObject deleteUserList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));
		userService.deleteUserList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping(value="/update",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String updateUser(HttpServletRequest request){
		User user = new User();
		user.setUserId(Integer.parseInt(request.getParameter("userId")));
		user.setUserName(request.getParameter("userName"));;
		user.setUserPwd(request.getParameter("pass"));
		user.setGroup(request.getParameter("group"));
		userService.updateUser(user);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj.toString();
	}
}
