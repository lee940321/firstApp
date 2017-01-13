package com.app.controller;

import java.io.IOException;
import java.io.StringReader;
import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.service.InoutlistService;

import net.sf.json.JSONObject;

@RequestMapping("/center")
@Controller
public class CenterController {
	
	@Resource(name="InoutlistServiceImpl")
	public InoutlistService inoutlistService;
	
	@RequestMapping(value="/list",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getCenter(HttpServletRequest request){
		Calendar a=Calendar.getInstance();
		Integer year = a.get(Calendar.YEAR);
		System.out.println(year);
		System.out.println(inoutlistService.getCenter(year));
		JSONObject obj = new JSONObject();
		obj = inoutlistService.getCenter(year);
		return obj.toString();
	}

	
	@RequestMapping(value="/svg",method=RequestMethod.POST,produces="text/html;charset=UTF-8")
    private void svgServer(HttpServletRequest request,HttpServletResponse response) throws IOException{
        String svgString = request.getParameter("svg");
       
        String type = request.getParameter("type");
        response.setContentType(type);
        response.setHeader("Content-disposition","attachment;filename=" + new String(("收支图形"+ ".jpeg").getBytes("GBK"),  
                "ISO8859_1"));
       
        JPEGTranscoder t = new JPEGTranscoder();
        t.addTranscodingHint(JPEGTranscoder.KEY_QUALITY,new Float(.8));
        TranscoderInput input = new TranscoderInput(new StringReader(svgString));
        try {
            TranscoderOutput output = new TranscoderOutput(response.getOutputStream());
            t.transcode(input, output);
            response.getOutputStream().flush();
            response.getOutputStream().close();
        }catch (Exception e){
            response.getOutputStream().close();
            e.printStackTrace();
        }
    }
}
