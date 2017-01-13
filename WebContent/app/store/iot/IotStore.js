/*
 * 收支类型信息数据集类
 */
 Ext.define("app.store.iot.IotStore",{
 	extend:'Ext.data.Store',
	model:'app.model.iot.IotModel',
	pageSize:20,
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/inouttype/list.action",
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