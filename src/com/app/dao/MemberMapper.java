package com.app.dao;

import java.util.List;

import com.app.entity.Member;

public interface MemberMapper {

	/**查询所有家庭成员信息*/
	public List<Member> getMember();
	
	/**分页查询家庭成员信息*/
	public List<Member> getPageMember(int param1,int param2);
	
	/**添加家庭成员信息*/
	public void addMember(Member member);
	
	/**跟新家庭成员信息*/
	public void updateMember(Member member);
	
	/**批量删除家庭成员信息*/
	public void deleteMember(List<Integer> idList);
	
	/**根据名称查询家庭成员信息*/
	public Member getMemberByName(String name);
}
