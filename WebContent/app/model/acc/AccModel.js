/*
 * 账户实体类
 */
 Ext.define("app.model.acc.AccModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"accountId",type:"int"},
 		{name:"atype",type:"string"},
 		{name:"bName",type:"string"},
 		{name:"mName",type:"string"},
 		{name:"openDate",type:"string"},
 		{name:"flag",type:"string"},
 		{name:"asum",type:"double"},
 		{name:"picture",type:"string"},
 		{name:"memos",type:"string"}
 	]
 });