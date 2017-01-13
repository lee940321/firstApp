/**家庭资产管理视图布局类*/
Ext.define("app.view.house.HouseLayout", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.houselayout',
	title : "<center height=40>家庭资产信息</center>",
	closable:true,
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"housegrid"
	},{
		xtype:"houseform",
		hidden:true
	}]
});