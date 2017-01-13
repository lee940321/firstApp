package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.TypesMapper;
import com.app.entity.Types;
import com.app.service.TypesService;

import net.sf.json.JSONObject;

@Service("TypesServiceImpl")
public class TypesServiceImpl implements TypesService{
	
	@Autowired
	public TypesMapper typesMapper;
	
	@Override
	public List<Types> getType(){
		return typesMapper.getType();
	}
	
	@Override
	public Types getTypeByName(String name){
		return typesMapper.getTypeByName(name);
	}
	
	
	@Override
	public void addType(Types types){
		if(typesMapper.getTypeByName(types.getFlag())==null)
		  typesMapper.addType(types);
	}
	
	@Override
	public void updateType(Types types){
		typesMapper.updateType(types);
	}
	
	@Override
	public void deleteTypeList(List<Integer> idList){
		typesMapper.deleteType(idList);
	}
	
	@Override
	public int getCount(){
		return this.getType().size();	
	}
	
	@Override
	public List<Types> getPageType(int start,int limit){
		List<Types> list = typesMapper.getPageType(start, limit);
		return list;
	}
	
	@Override
	public String getPageTypeJson(int start,int limit){
		List<Types> list = this.getPageType(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Types> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}

	/**下拉框*/
	@Override
	public List<Types> getType1(){
		return typesMapper.getType1();
	}
	
	/**下拉框2级*/
	@Override
	public List<Types> getType2(String name){
		return typesMapper.getType2(name);
	}
}
