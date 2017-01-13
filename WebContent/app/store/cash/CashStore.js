/*
 * 账户信息数据集类
 */
 Ext.define("app.store.cash.CashStore",{
 	extend:'Ext.data.Store',
	model:'app.model.cash.CashModel',
	pageSize:10,
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/cash/list.action",
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