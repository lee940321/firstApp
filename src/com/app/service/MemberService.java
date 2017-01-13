package com.app.service;

import java.util.List;

import com.app.entity.Member;


public interface MemberService {

	public List<Member> getMember();
	
	public int getCount();
	
	public List<Member> getPageMember(int start,int list);
	
    public String getPageMemberJson(int start,int list);
	
	public String PageListToJson(List<Member> list);
	
	/** 添加用户 */
	public void addMember(Member member);
	
	/**更新用户*/
	public void updateMember(Member member);
	
	/**删除用户*/
	public void deleteMemberList(List<Integer> idList);
	
	public Member getMemberByName(String name);
}
