/*
 * ClassName 用户数据集
 */
 Ext.define("app.store.user.UserStore",{
 	extend:'Ext.data.Store',
	model:'app.model.user.UserModel',
	pageSize:10,//每页显示5条记录
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/user/list.action",
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