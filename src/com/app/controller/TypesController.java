package com.app.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.app.entity.Types;
import com.app.service.TypesService;

@Controller("TypesController")
@RequestMapping("/inouttype")
public class TypesController {

	@Autowired
	public TypesService typesService;
	
	/**分页显示*/
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getType(HttpServletRequest request){
		
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
                
 //       System.out.println(start);
//        System.out.println(limit);
//		System.out.println(typesService.getPageTypeJson(start,limit));
		return typesService.getPageTypeJson(start, limit);
		
	}
	

	@RequestMapping("/add")
	@ResponseBody
	public JSONObject addType(HttpServletRequest request){
		Types types = new Types();
		Types t= typesService.getTypeByName(request.getParameter("flag"));
		types.setTypeName(request.getParameter("typeName"));;
		types.setFlag(request.getParameter("flag"));
		JSONObject obj = new JSONObject();
		if(t==null)
		{
			typesService.addType(types);
			obj.put("success", true);
			obj.put("msg:", "新增成功");
			return obj;
		}else{
			obj.put("success", false);
			obj.put("msg:", "新增失败");
			return obj;
		}
	}
	
	/** 删除用户
	 * @return */
	@RequestMapping("/delete")
	@ResponseBody
	public JSONObject deleteTypeList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));
		typesService.deleteTypeList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public JSONObject updateType(HttpServletRequest request){
		Types types = new Types();
		types.setTypeId(Integer.parseInt(request.getParameter("typeId")));
		types.setTypeName(request.getParameter("typeName"));;
		types.setFlag(request.getParameter("flag"));
		typesService.updateType(types);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj;
	}
	

	/**下拉框*/
	@RequestMapping(value="/type1",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getType1(){
		List<Types> t = typesService.getType1();
		System.out.println(t);
		int count = t.size();
		JSONObject obj=new JSONObject();
		obj.put("totalCount", count);
		obj.put("rows", t);
		System.out.println(obj.toString());
		return obj.toString();
	}
	
	/**下拉框2级*/
	@RequestMapping(value="/type2",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getType2(HttpServletRequest request){
		String tName = request.getParameter("value");
		List<Types> flags = typesService.getType2(tName);
		int count = flags.size();
		JSONObject obj=new JSONObject();
		obj.put("totalCount", count);
		obj.put("rows", flags);
		return obj.toString();
		
	}
}
