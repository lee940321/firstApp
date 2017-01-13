/*
 * 家庭资产信息数据集类
 */
 Ext.define("app.store.house.HouseStore",{
 	extend:'Ext.data.Store',
	model:'app.model.house.HouseModel',
	pageSize:10,
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/house/list.action",
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