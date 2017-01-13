 Ext.define("app.store.list.DateStore",{
 	extend:'Ext.data.Store',
	model:'app.model.list.ListModel',
	storeId:'date_store',
	pageSize:20,//每页显示5条记录
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