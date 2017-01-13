package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MemberMapper;
import com.app.entity.Member;
import com.app.service.MemberService;

import net.sf.json.JSONObject;

@Service("MemberServiceImpl")
public class MemberServiceImpl implements MemberService{

	@Autowired
	MemberMapper memberMapper;
	
	@Override
	public List<Member> getMember(){
		return memberMapper.getMember();
	}
	
	@Override
	public int getCount(){
		return this.getMember().size();	
	}
	
	@Override
	public List<Member> getPageMember(int start,int limit){
		List<Member> list = memberMapper.getPageMember(start, limit);
		return list;
	}
	
	@Override
	public String getPageMemberJson(int start,int limit){
		List<Member> list = this.getPageMember(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Member> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public void addMember(Member member){
		if(memberMapper.getMemberByName(member.getMemName())==null)
		  memberMapper.addMember(member);
	}
	
	@Override
	public void updateMember(Member member){
		memberMapper.updateMember(member);
	}
	
	@Override
	public void deleteMemberList(List<Integer> idList){
		memberMapper.deleteMember(idList);
	}
	
	@Override
	public Member getMemberByName(String name){
		return memberMapper.getMemberByName(name);
	}
}
