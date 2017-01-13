/**北部*/
Ext.define("app.view.TopView", {
	extend:"Ext.panel.Panel",
	alias : 'widget.topview',
	id:"topview",
	height : 50,
	bodyStyle : {
		background : '#7598e0',
		padding : '80px'
	},

	layout : "absolute",
	items : [{
				x : 0,
				y : 0,
				width:230,
				//border:0,
				html : "<img src='./resources/images/logo.jpg'/>"
			},{
				x : 230,
				y : 0,
				width:450,
				bodyStyle : {
					background : '#7598e0',
					border:0,
					padding : '10px'
				},
				html : "<h1><font color=white size=4>&nbsp;&nbsp;&nbsp;&nbsp;  家庭财务管理系统 </font></h1>"
			},{
				x : 800,
				y : 20,
				ref : "logininfo",
				xtype : "displayfield",
				id:"displaylogin",
				value : "<font color=white><b>未登录</b></font>"
			}, {
				x : 890,
				y : 20,
				xtype : "button",
				ref : "logout",
				text : "注销"
			},{
				x : 960,
				y : 20,
				xtype : "button",
				ref : "exit",
				text : "退出系统"
			}]
});
