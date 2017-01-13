/*
 * ClassName 用户数据集
 */
 Ext.define("app.store.bank.BankStore",{
 	extend:'Ext.data.Store',
	model:'app.model.bank.BankModel',
	pageSize:20,//每页显示5条记录
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/bank/list.action",
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