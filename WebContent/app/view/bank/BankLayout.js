/**银行管理视图布局类*/
Ext.define("app.view.bank.BankLayout", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.banklayout',
	title : "<center height=40>银行信息</center>",
	closable:true,
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"bankgrid"
	},{
		xtype:"bankform",
		hidden:true
	}]
});