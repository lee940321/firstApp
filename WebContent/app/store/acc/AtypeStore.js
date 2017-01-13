/*
 * ClassName 用户数据集
 */
 Ext.define("app.store.acc.AtypeStore",{
 	extend:'Ext.data.Store',
	model:'app.model.acc.AtypeModel',
	storeId:'acc_store',
	pageSize:10,//每页显示5条记录
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		}
	},
	autoLoad:true	
 });