/*
 * 银行实体类
 */
 Ext.define("app.model.bank.BankModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"bankId",type:"int"},
 		{name:"bankName",type:"string"},
 		{name:"bshort",type:"string"} 		
 	]
 });