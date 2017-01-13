/*
 * 账户实体类
 */
 Ext.define("app.model.cash.CashModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"cId",type:"int"},
 		{name:"mName",type:"string"},
 		{name:"cName",type:"string"},
 		{name:"openDate",type:"string"},
 		{name:"cType",type:"string"},
 		{name:"csum",type:"double"},
 		{name:"memos",type:"string"}
 	]
 });