package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.app.entity.Bank;
import com.app.service.BankService;

@RequestMapping("/bank")
@Controller("BankController")
public class BankController {
	
	@Resource(name="BankServiceImpl")
	public BankService bankService; 
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getMember(HttpServletRequest request,HttpServletResponse response){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
//       System.out.println(bankService.getPageBankJson(start, limit));
		return bankService.getPageBankJson(start, limit);
	}

	@RequestMapping("/add")
	@ResponseBody
	public JSONObject addBank(HttpServletRequest request){
		Bank bank = new Bank();
		Bank b= bankService.getBankByName(request.getParameter("bankName"));
		bank.setBankName(request.getParameter("bankName"));;
		bank.setBshort(request.getParameter("bshort"));
		JSONObject obj = new JSONObject();
		if(b==null)
		{
			bankService.addBank(bank);
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
	public JSONObject deleteBankList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));
		bankService.deleteBankList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public JSONObject updateBank(HttpServletRequest request){
		Bank bank = new Bank();
		bank.setBankId(Integer.parseInt(request.getParameter("bankId")));
		bank.setBankName(request.getParameter("bankName"));;
		bank.setBshort(request.getParameter("bshort"));
		bankService.updateBank(bank);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj;
	}
}
