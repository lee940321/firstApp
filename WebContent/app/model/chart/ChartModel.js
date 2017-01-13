/*
 * 图形实体类
 */
 Ext.define("app.model.chart.ChartModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"type",type:"string"},
 		{name:"sum",type:"double"}	
 	]
 });