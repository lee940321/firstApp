package com.app.dao;

import java.util.List;

import com.app.entity.Types;

public interface TypesMapper {

	/** 查询所有类型信息 */
	public List<Types> getType();
	
	/**根据名称查询*/
	public Types getTypeByName(String name);
	
	/** 添加  */
	public void  addType(Types type);
	
	/** 修改 */
	public  void updateType(Types type);
	
	/** 批量删除删除*/
	public void deleteType(List<Integer> idList);
	
	/**分页查询*/
	public List<Types> getPageType(int param1,int param2);
	
	/**下拉框1__Distinct方法*/
	public List<Types> getType1();
	
	/**下拉框2__根据收支类型查找详细*/
	public List<Types> getType2(String name);
	
	/**根据类型查询明细*/
	public List<String> getFlag(String name);
}
