/*
 * ClassName 图形数据集
 */
 Ext.define("app.store.chart.ChartStore",{
 	extend:'Ext.data.Store',
	model:'app.model.chart.ChartModel',
	storeId:'chartStore',
	//autoSync:true,//与服务器同步
	proxy:{
		type:"ajax",
		url:"/jtcw/inoutlist/chart.action",
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