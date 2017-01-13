package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AccountMapper;
import com.app.dao.InoutlistMapper;
import com.app.entity.Account;
import com.app.service.AccountService;

import net.sf.json.JSONObject;

@Service("AccountServiceImpl")
public class AccountServiceImpl implements AccountService{

	@Autowired
	public AccountMapper accountMapper;
	@Autowired
	public InoutlistMapper inoutlistMapper;
	
	
	@Override
	public List<Account> getAcc(){
		return accountMapper.getAcc();
	}
	
	@Override
	public List<Account> getAccByName(String name){
		return accountMapper.getAccByName(name);
	}
	
	
	@Override
	public void addAcc(Account acc){
		accountMapper.addAcc(acc);
	}
	
	@Override
	public void updateAcc(Account acc){
		accountMapper.updateAcc(acc);
	}
	
	@Override
	public void deleteAccList(List<Integer> idList){
		accountMapper.deleteAcc(idList);
	}
	
	@Override
	public int getCount(){
		return this.getAcc().size();	
	}
	
	@Override
	public List<Account> getPageAcc(int start,int limit){
		List<Account> list = accountMapper.getPageAcc(start, limit);
		return list;
	}
	
	@Override
	public String getPageAccJson(int start,int limit){
		List<Account> list = this.getPageAcc(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Account> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public void deleteByName(Integer id){
		String n = accountMapper.findNameById(id);
		inoutlistMapper.deleteByName(n);
	}
	
	/**2级联动下拉框，根据用户名查询账户*/
	@Override
	public List<String> getA(String name){
		return accountMapper.getA(name);
	}
}
