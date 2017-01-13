/**明细管理视图布局类*/
Ext.define("app.view.list.ListLayout", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.listlayout',
	title : "<center height=40>收支明细</center>",
	closable:true,
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"listgrid"
	},{
		xtype:"listform",
		hidden:true
	}]
});