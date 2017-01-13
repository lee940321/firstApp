/*
 * 用户实体类
 */
 Ext.define("app.model.user.UserModel",{
 	extend:"Ext.data.Model",
 	fields:[
 	    {name:"userId",type:"int"},
 		{name:"userName",type:"string"},
 		{name:"userPwd",type:"string"},
 		{name:"group",type:"string"}
 	]
 });