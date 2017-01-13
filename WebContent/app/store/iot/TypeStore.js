/*
 * 收支类型下拉框
 */
 Ext.define("app.store.iot.TypeStore",{
 	extend:'Ext.data.Store',
	model:'app.model.iot.IotModel',
	pageSize:10,
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/inouttype/type1.action",
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