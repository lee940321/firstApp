/**用户管理视图布局类*/
Ext.define("app.view.user.UserLayout", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.userlayout',
	title : "<center height=40>用户基本信息</center>",
	closable:true,
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"usergrid"
	},{
		xtype:"userform",
		hidden:true
	}]
});