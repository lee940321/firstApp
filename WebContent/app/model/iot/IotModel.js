/*
 * 收支类型信息实体类
 */
 Ext.define("app.model.iot.IotModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"typeId",type:"int"},
 		{name:"typeName",type:"string"},
 		{name:"flag",type:"string"}
 	]
 });