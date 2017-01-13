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
import com.app.entity.Inoutlist;
import com.app.service.InoutlistService;

@RequestMapping("/inoutlist")
@Controller("InoutlistController")
public class InoutlistController {
	
	@Resource(name="InoutlistServiceImpl")
	public InoutlistService inoutlistService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getList(HttpServletRequest request,HttpServletResponse response){
		int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        System.out.println(inoutlistService.getPageListJson(start, limit));
		return inoutlistService.getPageListJson(start, limit);
	}

	@RequestMapping("/add")
	@ResponseBody
	public JSONObject addList(HttpServletRequest request){
		Inoutlist list = new Inoutlist();
		double useSum = Double.parseDouble(request.getParameter("useSum"));
		String typeName = request.getParameter("tName");
		String aName = request.getParameter("aName");
		double sum = inoutlistService.getSumByName(aName);;
			System.out.println(sum);
		
		list.setmName(request.getParameter("mName"));
		list.setaName(aName);
		list.setUseDate(request.getParameter("useDate"));
		list.settName(typeName);
		list.setFlag(request.getParameter("flag"));
		list.setUseSum(useSum);
		list.setMemos(request.getParameter("memos"));
		
		if(typeName.equals("收入")){
			sum = sum + useSum;
		}else {//if(typeName.equals("支出")){
			sum = sum - useSum;
		}
		list.setSum(sum);
		JSONObject obj = new JSONObject();
		if(sum >= 0){
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
	public JSONObject deleteListList(String ids){
		ids = ids.substring(0, ids.length()-1);
		String idArray[] = ids.split(",");
		List<Integer> idList = new ArrayList<Integer>();
		for(String id:idArray)
			idList.add(Integer.parseInt(id));	
		inoutlistService.deleteListList(idList);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "删除成功！");
		return obj;
		
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public JSONObject updateList(HttpServletRequest request){
		Inoutlist list = new Inoutlist();
		list.setListId(Integer.parseInt(request.getParameter("listId")));
		list.setmName(request.getParameter("mName"));
		list.setaName(request.getParameter("aName"));
		list.setUseDate(request.getParameter("useDate"));
		list.settName(request.getParameter("tName"));
		list.setFlag(request.getParameter("flag"));
		list.setUseSum(Double.parseDouble(request.getParameter("useSum")));
		list.setSum(Double.parseDouble(request.getParameter("sum")));
		list.setMemos(request.getParameter("memos"));
		System.out.println(list.getmName());
		inoutlistService.updateList(list);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("msg", "修改成功！");
		return obj;
	}
	
	@RequestMapping(value="/list_date",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getListByDate(HttpServletRequest request){
		String date = request.getParameter("value");
		System.out.println(date);
		List<Inoutlist> list = inoutlistService.getListByDate(date);
		return inoutlistService.PageListToJson(list);
	}
	
	@RequestMapping(value="/chart",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getSum(HttpServletRequest request){
		String name = request.getParameter("value");
		String type = request.getParameter("type");
		if(type==null||type.length()<=0){
			type = "收入";
		}
		if(name==null||name.length()<=0){
		    return inoutlistService.getChart1(type);
		}else{	 		
		    return inoutlistService.getChart(name, type);
		}
	}

	@SuppressWarnings("deprecation")
	@RequestMapping("/excel")
	@ResponseBody
	public String excel(HttpServletRequest request,HttpServletResponse response){
		List<Inoutlist> list = inoutlistService.getList();
		//创建一个新的Excel  
        HSSFWorkbook workBook = new HSSFWorkbook();  
        //创建sheet页  
        HSSFSheet sheet = workBook.createSheet();  
        //sheet页名称  
        workBook.setSheetName(0, "收支明细");  
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
        
        cell0.setCellValue("账户人");  
        cell1.setCellValue("账户账号");  
        cell2.setCellValue("交易日期");
        cell3.setCellValue("收支类型");
        cell4.setCellValue("收支详情");
        cell5.setCellValue("金额");
        cell6.setCellValue("账户余额");
        cell7.setCellValue("备注");
        
        if(list != null && !list.isEmpty()) {  
            for(int i = 0; i < list.size(); i++) {  
                Inoutlist l = list.get(i);  
                row = sheet.createRow(i + 1);  
                cell0 = row.createCell(Short.valueOf("0"));  
                cell1 = row.createCell(Short.valueOf("1"));  
                cell2 = row.createCell(Short.valueOf("2"));
                cell3 = row.createCell(Short.valueOf("3"));
                cell4 = row.createCell(Short.valueOf("4"));
                cell5 = row.createCell(Short.valueOf("5"));
                cell6 = row.createCell(Short.valueOf("6"));
                cell7 = row.createCell(Short.valueOf("7"));
                cell0.setCellValue(l.getmName());  
                cell1.setCellValue(l.getaName());  
                cell2.setCellValue(l.getUseDate());
                cell3.setCellValue(l.gettName());
                cell4.setCellValue(l.getFlag());
                cell5.setCellValue(l.getUseSum());
                cell6.setCellValue(l.getSum());
                cell7.setCellValue(l.getMemos());    
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
                    + new String(("账户收支明细表" + ".xls").getBytes("GBK"),  
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
