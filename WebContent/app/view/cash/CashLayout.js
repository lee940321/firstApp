Ext.define("app.view.cash.CashLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.cashlayout',
			title : "<center height=40>现金账户列表</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"cashgrid"
			},{
				xtype:"cashform",
				hidden:true
			},{
				xtype:"cashlistform",
				hidden:true
			}]
});