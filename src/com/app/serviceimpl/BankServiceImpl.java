package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BankMapper;
import com.app.entity.Bank;
import com.app.service.BankService;

import net.sf.json.JSONObject;

@Service("BankServiceImpl")
public class BankServiceImpl implements BankService{
	
	@Autowired
	public BankMapper bankMapper;
	
	@Override
	public List<Bank> getBank(){
		return bankMapper.getBank();
	}
	
	@Override
	public Bank getBankByName(String name){
		return bankMapper.getBankByName(name);
	}
	
	
	@Override
	public void addBank(Bank bank){
		if(bankMapper.getBankByName(bank.getBankName())==null)
		  bankMapper.addBank(bank);
	}
	
	@Override
	public void updateBank(Bank bank){
		bankMapper.updateBank(bank);
	}
	
	@Override
	public void deleteBankList(List<Integer> idList){
		bankMapper.deleteBank(idList);
	}
	
	@Override
	public int getCount(){
		return this.getBank().size();	
	}
	
	@Override
	public List<Bank> getPageBank(int start,int limit){
		List<Bank> list = bankMapper.getPageBank(start, limit);
		return list;
	}
	
	@Override
	public String getPageBankJson(int start,int limit){
		List<Bank> list = this.getPageBank(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Bank> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}

}
