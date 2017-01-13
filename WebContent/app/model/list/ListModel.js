/*
 * 明细实体类
 */
 Ext.define("app.model.list.ListModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"listId",type:"int"},
 		{name:"mName",type:"string"},
 		{name:"aName",type:"string"},
 		{name:"useDate",type:"string"},
 		{name:"tName",type:"string"},
 		{name:"flag",type:"string"},
 		{name:"useSum",type:"double"},
 		{name:"sum",type:"double"},
 		{name:"memos",type:"string"}
 	]
 });