/*
 * 家庭资产实体类
 */
 Ext.define("app.model.house.HouseModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"hId",type:"int"},
 		{name:"hName",type:"string"},
 		{name:"hType",type:"string"},
 		{name:"hDate",type:"string"},
 		{name:"money",type:"double"},
 		{name:"memos",type:"string"},
 		{name:"picture",type:"string"}
 	]
 });