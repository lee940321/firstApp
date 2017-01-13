package com.app.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.app.entity.House;
import com.app.service.HouseService;

@Controller("HouseController")
@RequestMapping("/house")
public class HouseController {

	@Resource(name="HouseServiceImpl")
	public HouseService houseService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getHouse(HttpServletRequest request,HttpServletResponse response){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        return houseService.getPageHouseJson(start, limit);		
	}
	
	@RequestMapping("/add")
	public void addHouse(@RequestParam MultipartFile pictures,HttpServletRequest request,HttpServletResponse response, PrintWriter writer)throws IOException{
		House house = new House();
		house.sethName(request.getParameter("hName"));
		house.sethType(request.getParameter("hType"));
		house.sethDate(request.getParameter("hDate"));
		house.setMoney(Double.parseDouble(request.getParameter("money")));
		house.setMemos(request.getParameter("memos"));
       
		System.out.println(request.getParameter("hName"));
		
		/**解决乱码问题*/
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;  charset=UTF-8");
		
		if(pictures.isEmpty()){
			System.out.println("文件未上传");
			house.setPicture("default.jpg");
		}else{
			house.setPicture(pictures.getOriginalFilename());
			//如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
			String realPath = request.getSession().getServletContext().getRealPath("/images/picture");
			//这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
			FileUtils.copyInputStreamToFile(pictures.getInputStream(), new File(realPath, pictures.getOriginalFilename()));
		}
		houseService.addHouse(house);
		writer.write("{success:true, msg:'新增成功!'}");
	}
	
	/** 删除用户
	 * @return */
	@RequestMapping("/delete")
	@ResponseBody
	public JSONObject deleteHouseList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));
		houseService.deleteHouseList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public void updateHouse(@RequestParam MultipartFile pictures,HttpServletRequest request,HttpServletResponse response,PrintWriter writer)throws IOException{
		House house = new House();
		house.sethId(Integer.parseInt(request.getParameter("hId")));
		house.sethName(request.getParameter("hName"));
		house.sethType(request.getParameter("hType"));
		house.sethDate(request.getParameter("hDate"));
		house.setMoney(Double.parseDouble(request.getParameter("money")));
		house.setMemos(request.getParameter("memos"));
	
		/**解决乱码问题*/
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;  charset=UTF-8");
		if(house!=null){
			
			if(pictures.isEmpty()){
		
			}else{
				house.setPicture(pictures.getOriginalFilename());
				//如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
				String realPath = request.getSession().getServletContext().getRealPath("/images/picture");
				//这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
				FileUtils.copyInputStreamToFile(pictures.getInputStream(), new File(realPath, pictures.getOriginalFilename()));
			}
			houseService.updateHouse(house);
			writer.write("{success:true, msg:'修改成功!',picture:'"+pictures.getOriginalFilename()+"'}");
		}else{
			writer.write("{success:false, msg:'修改失败!'}");
		}
		
	}
}
