/*
 * 家庭人员信息数据集类
 */
 Ext.define("app.store.mem.MemStore",{
 	extend:'Ext.data.Store',
	model:'app.model.mem.MemModel',
	pageSize:10,
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/member/list.action",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true	
 });