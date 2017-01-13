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
import com.app.entity.Member;

import com.app.service.MemberService;

@Controller("MemberController")
@RequestMapping("/member")
public class MemberController {

	@Resource(name="MemberServiceImpl")
	public MemberService memberService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getMember(HttpServletRequest request,HttpServletResponse response){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
 //       System.out.println(memberService.getPageMemberJson(start, limit));
		return memberService.getPageMemberJson(start, limit);
	}
	
	@RequestMapping("/add")
	public void addMember(@RequestParam MultipartFile pictures,HttpServletRequest request,HttpServletResponse response, PrintWriter writer)throws IOException{
		Member member = new Member();
		Member m = memberService.getMemberByName(request.getParameter("memName"));
		member.setMemName(request.getParameter("memName"));
		member.setSex(request.getParameter("sex"));
		member.setBirth(request.getParameter("birth"));
		member.setMobile(request.getParameter("mobile"));
		member.setJob(request.getParameter("job"));

		
		/**解决乱码问题*/
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;  charset=UTF-8");
		
		if(m==null){
			if(pictures.isEmpty()){
				System.out.println("文件未上传");
				member.setPicture("default.jpg");
			}else{
				member.setPicture(pictures.getOriginalFilename());
				//如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
				String realPath = request.getSession().getServletContext().getRealPath("/images/picture");
				//这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
				FileUtils.copyInputStreamToFile(pictures.getInputStream(), new File(realPath, pictures.getOriginalFilename()));
			}
			memberService.addMember(member);
			
			writer.write("{success:true, msg:'新增成功!'}");
			
		}else{
			writer.write("{success:false, msg:'新增失败!'}");
		}
	}
	
	/** 删除用户
	 * @return */
	@RequestMapping("/delete")
	@ResponseBody
	public JSONObject deleteMemberList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));
		memberService.deleteMemberList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public void updateMember(@RequestParam MultipartFile pictures,HttpServletRequest request,HttpServletResponse response,PrintWriter writer)throws IOException{
		Member member = new Member();
		member.setMemId(Integer.parseInt(request.getParameter("memId")));
		member.setMemName(request.getParameter("memName"));
		member.setSex(request.getParameter("sex"));
		member.setBirth(request.getParameter("birth"));
		member.setMobile(request.getParameter("mobile"));
		member.setJob(request.getParameter("job"));

		/**解决乱码问题*/
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;  charset=UTF-8");
		if(member!=null){
			
			if(pictures.isEmpty()){
				//System.out.println("文件未上传");
				//product.setPhoto("default.jpg");
			}else{
				member.setPicture(pictures.getOriginalFilename());
				//如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
				String realPath = request.getSession().getServletContext().getRealPath("/images/picture");
				//这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
				FileUtils.copyInputStreamToFile(pictures.getInputStream(), new File(realPath, pictures.getOriginalFilename()));
			}
			memberService.updateMember(member);
			writer.write("{success:true, msg:'修改成功!',picture:'"+pictures.getOriginalFilename()+"'}");
		}else{
			writer.write("{success:false, msg:'修改失败!'}");
		}
		
	}
}
