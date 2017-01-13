/*
 * 人员信息实体类
 */
 Ext.define("app.model.mem.MemModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"memId",type:"int"},
 		{name:"memName",type:"string"},
 		{name:"sex",type:"string"},
 		{name:"birth",type:"string"},
 		{name:"mobile",type:"string"},
 		{name:"job",type:"string"},
 		{name:"picture",type:"string"}
 	]
 });