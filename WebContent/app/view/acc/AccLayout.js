Ext.define("app.view.acc.AccLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.acclayout',
			title : "<center height=40>银行账户列表</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"accgrid"
			},{
				xtype:"accform",
				hidden:true
			},{
				xtype:"acclistform",
				hidden:true
			}]
});