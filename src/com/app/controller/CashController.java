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

import com.alibaba.fastjson.JSONObject;
import com.app.entity.Cash;
import com.app.entity.Inoutlist;
import com.app.service.CashService;
import com.app.service.InoutlistService;

@RequestMapping("/cash")
@Controller("CashController")
public class CashController {

	@Resource(name="CashServiceImpl")
	public CashService cashService;
	@Resource(name="InoutlistServiceImpl")
	public InoutlistService inoutlistService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getCash(HttpServletRequest request){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
		return cashService.getPageCashJson(start, limit);
	}
	
	@RequestMapping("/add")
	@ResponseBody
	public JSONObject addAcc(HttpServletRequest request){
		Cash cash = new Cash();
		cash.setcName(request.getParameter("cName"));
		cash.setmName(request.getParameter("mName"));
		cash.setOpenDate(request.getParameter("openDate"));
		cash.setCsum(Double.parseDouble(request.getParameter("csum")));
		cash.setcType(request.getParameter("cType"));
		cash.setMemos(request.getParameter("memos"));
		
		Inoutlist list = new Inoutlist();
		list.setaName(request.getParameter("cName"));
		list.setmName(request.getParameter("mName"));
		list.setUseDate(request.getParameter("openDate"));
		list.settName("收入");
		list.setFlag("开户");
		list.setUseSum(Double.parseDouble(request.getParameter("csum")));
		list.setSum(Double.parseDouble(request.getParameter("csum")));
		list.setMemos(request.getParameter("memos"));
		
		JSONObject obj = new JSONObject();
		inoutlistService.addList(list);
			cashService.addCash(cash);		
			obj.put("success", true);
			obj.put("msg:", "新增成功");
			return obj;
	
	}
	
	/** 删除用户
	 * @return */
	@RequestMapping("/delete")
	@ResponseBody
	public JSONObject deleteAccList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		String name;                                      //存放账户名
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray){
			idList.add(Integer.parseInt(id));
			name = cashService.getNameById(Integer.parseInt(id));  //查询id对应账户名
			inoutlistService.deleteL(name);                        //根据账户名删除明细里的数据
		}		
		cashService.deleteCashList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public JSONObject updateBank(HttpServletRequest request){
		Cash acc = new Cash();
		acc.setcId(Integer.parseInt(request.getParameter("cId")));
		acc.setcName(request.getParameter("cName"));
		acc.setmName(request.getParameter("mName"));
		acc.setOpenDate(request.getParameter("openDate"));
		acc.setCsum(Double.parseDouble(request.getParameter("csum")));
		acc.setcType(request.getParameter("cType"));
		acc.setMemos(request.getParameter("memos"));
		
		cashService.updateCash(acc);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj;
	}
	
	/**账户双击明细，根据账户显示所有该账户交易详情*/
	@RequestMapping(value="/list_show",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getList_Show(HttpServletRequest request){
		String name = request.getParameter("aName");
		System.out.println(name);
		List<Inoutlist> list = inoutlistService.getListByName(name);
		return inoutlistService.PageListToJson(list);		
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/excel")
	@ResponseBody
	public String excel(HttpServletRequest request,HttpServletResponse response){
		List<Cash> list = cashService.getCash();
		//创建一个新的Excel  
        HSSFWorkbook workBook = new HSSFWorkbook();  
        //创建sheet页  
        HSSFSheet sheet = workBook.createSheet();  
        //sheet页名称  
        workBook.setSheetName(0, "现金账户表");  
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
        
        cell0.setCellValue("现金账户");  
        cell1.setCellValue("持有人");  
        cell2.setCellValue("初始金额");
        cell3.setCellValue("开户时间");
        cell4.setCellValue("现金类型");
        cell5.setCellValue("备注");
               
        if(list != null && !list.isEmpty()) {  
            for(int i = 0; i < list.size(); i++) {  
                Cash l = list.get(i);  
                row = sheet.createRow(i + 1);  
                cell0 = row.createCell(Short.valueOf("0"));  
                cell1 = row.createCell(Short.valueOf("1"));  
                cell2 = row.createCell(Short.valueOf("2"));
                cell3 = row.createCell(Short.valueOf("3"));
                cell4 = row.createCell(Short.valueOf("4"));
                cell5 = row.createCell(Short.valueOf("5"));
                cell0.setCellValue(l.getcName());  
                cell1.setCellValue(l.getmName());  
                cell2.setCellValue(l.getCsum());
                cell3.setCellValue(l.getOpenDate());
                cell4.setCellValue(l.getcType());
                cell5.setCellValue(l.getMemos());  
                sheet.setColumnWidth((short) 0, (short) 4000);  
                sheet.setColumnWidth((short) 1, (short) 4000);  
                sheet.setColumnWidth((short) 2, (short) 4000);  
                sheet.setColumnWidth((short) 3, (short) 4000);
                sheet.setColumnWidth((short) 4, (short) 4000);
                sheet.setColumnWidth((short) 5, (short) 4000);
            }  
        }  
        response.reset();  
        response.setContentType("application/msexcel;charset=UTF-8");  
        try {  
            response.addHeader("Content-Disposition", "attachment;filename=\""  
                    + new String(("现金账户表" + ".xls").getBytes("GBK"),  
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
