package com.app.controller;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.app.entity.Account;
import com.app.entity.Inoutlist;
import com.app.service.AccountService;
import com.app.service.CashService;
import com.app.service.InoutlistService;

@RequestMapping("/account")
@Controller("AccountController")
public class AccountController {

	@Resource(name="AccountServiceImpl")
	public AccountService accountService;
	@Resource(name="InoutlistServiceImpl")
	public InoutlistService inoutlistService;
	@Resource(name="CashServiceImpl")
	public CashService cashService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getAccount(HttpServletRequest request){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
//        System.out.println(accountService.getPageAccJson(start, limit));
		return accountService.getPageAccJson(start, limit);
	}
	
	@RequestMapping("/add")
	@ResponseBody
	public JSONObject addAcc(HttpServletRequest request){
		Account acc = new Account();
		List<Account> a= accountService.getAccByName(request.getParameter("atype"));
		acc.setAtype(request.getParameter("atype"));
		acc.setbName(request.getParameter("bName"));
		acc.setmName(request.getParameter("mName"));
		acc.setOpenDate(request.getParameter("openDate"));
		acc.setFlag(request.getParameter("flag"));
		acc.setAsum(Double.parseDouble(request.getParameter("asum")));
		acc.setPicture(request.getParameter("picture"));
		acc.setMemos(request.getParameter("memos"));
		System.out.println(request.getParameter("bName"));
		
		Inoutlist list = new Inoutlist();
		list.setaName(request.getParameter("atype"));
		list.setmName(request.getParameter("mName"));
		list.setUseDate(request.getParameter("openDate"));
		list.settName("收入");
		list.setFlag("开户");
		list.setUseSum(Double.parseDouble(request.getParameter("asum")));
		list.setSum(Double.parseDouble(request.getParameter("asum")));
		
		JSONObject obj = new JSONObject();
		if(a==null)
		{
			accountService.addAcc(acc);
			inoutlistService.addList(list);
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
	public JSONObject deleteAccList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray){
			idList.add(Integer.parseInt(id));
			accountService.deleteByName(Integer.parseInt(id));
		}		
		accountService.deleteAccList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public JSONObject updateBank(HttpServletRequest request){
		Account acc = new Account();
		acc.setAccountId(Integer.parseInt(request.getParameter("accountId")));
		acc.setAtype(request.getParameter("atype"));
		acc.setbName(request.getParameter("bName"));
		acc.setmName(request.getParameter("mName"));
		acc.setOpenDate(request.getParameter("openDate"));
		acc.setFlag(request.getParameter("flag"));
		acc.setAsum(Double.parseDouble(request.getParameter("asum")));
		acc.setPicture(request.getParameter("picture"));
		acc.setMemos(request.getParameter("memos"));
		
		accountService.updateAcc(acc);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj;
	}
	
	/**二级下拉框，根据家庭成员查询银行与现金账户*/
	@RequestMapping(value="/atype",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getA(HttpServletRequest request){
		String value = request.getParameter("value");
		List<String> acc = accountService.getA(value);
		
		List<String> list = cashService.getCByName(value);
		list.addAll(acc);
		System.out.println(list);
	
		int count = list.size();

		JSONArray array=new JSONArray();
        for(int i=0;i<count;i++){
			JSONObject o = new JSONObject();
			o.put("aaa", list.get(i));
			array.add(o);
		}
		System.out.println(array);		
		JSONObject obj=new JSONObject();
		obj.put("totalCount", count);
		obj.put("rows", array);
		System.out.println(obj.toString());
		return obj.toString();
	}
	
	/**账户双击明细，根据账户显示所有该账户交易详情*/
	@RequestMapping(value="/list_show",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getList_Show(HttpServletRequest request){
		String name = request.getParameter("aName");
		List<Inoutlist> list = inoutlistService.getListByName(name);
		return inoutlistService.PageListToJson(list);
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/excel")
	@ResponseBody
	public String excel(HttpServletRequest request,HttpServletResponse response){
		List<Account> list = accountService.getAcc();
		//创建一个新的Excel  
        HSSFWorkbook workBook = new HSSFWorkbook();  
        //创建sheet页  
        HSSFSheet sheet = workBook.createSheet();  
        //sheet页名称  
        workBook.setSheetName(0, "银行账户表");  
        //创建header页  
        HSSFHeader header = sheet.getHeader();  
        //设置标题居中  
        header.setCenter("标题"); 
        
      //设置第一行为Header  
        HSSFRow row = sheet.createRow(0);  
        HSSFCell cell0 = row.createCell(Short.valueOf("0"));  
        HSSFCell cell1 = row.createCell(Short.valueOf("1"));  
        HSSFCell cell2 = row.createCell(Short.valueOf("2"));
        HSSFCell cell3 = row.createCell(Short.valueOf("3"));
        HSSFCell cell4 = row.createCell(Short.valueOf("4"));
        HSSFCell cell5 = row.createCell(Short.valueOf("5"));
        HSSFCell cell6 = row.createCell(Short.valueOf("6"));
        HSSFCell cell7 = row.createCell(Short.valueOf("7"));
        
        cell0.setCellValue("银行账户");  
        cell1.setCellValue("开户银行");  
        cell2.setCellValue("持有人");
        cell3.setCellValue("开户日期");
        cell4.setCellValue("开户地点");
        cell5.setCellValue("金额");
        cell6.setCellValue("现金类型");
        cell7.setCellValue("备注");
        
        if(list != null && !list.isEmpty()) {  
            for(int i = 0; i < list.size(); i++) {  
                Account a = list.get(i);  
                row = sheet.createRow(i + 1);  
                cell0 = row.createCell(Short.valueOf("0"));  
                cell1 = row.createCell(Short.valueOf("1"));  
                cell2 = row.createCell(Short.valueOf("2"));
                cell3 = row.createCell(Short.valueOf("3"));
                cell4 = row.createCell(Short.valueOf("4"));
                cell5 = row.createCell(Short.valueOf("5"));
                cell6 = row.createCell(Short.valueOf("6"));
                cell7 = row.createCell(Short.valueOf("7"));
                cell0.setCellValue(a.getAtype());  
                cell1.setCellValue(a.getbName());  
                cell2.setCellValue(a.getmName());
                cell3.setCellValue(a.getOpenDate());
                cell4.setCellValue(a.getFlag());
                cell5.setCellValue(a.getAsum());
                cell6.setCellValue(a.getPicture());
                cell7.setCellValue(a.getMemos());    
                sheet.setColumnWidth((short) 0, (short) 4000);  
                sheet.setColumnWidth((short) 1, (short) 4000);  
                sheet.setColumnWidth((short) 2, (short) 4000);  
                sheet.setColumnWidth((short) 3, (short) 4000);
                sheet.setColumnWidth((short) 4, (short) 4000);
                sheet.setColumnWidth((short) 5, (short) 4000);
                sheet.setColumnWidth((short) 6, (short) 4000);
                sheet.setColumnWidth((short) 7, (short) 4000);
            }  
        }  
        response.reset();  
        response.setContentType("application/msexcel;charset=UTF-8");  
        try {  
            response.addHeader("Content-Disposition", "attachment;filename=\""  
                    + new String(("银行账户表" + ".xls").getBytes("GBK"),  
                            "ISO8859_1") + "\"");  
            OutputStream out = response.getOutputStream();  
            workBook.write(out);  
            out.flush();  
            out.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
		return null;
	}
}
