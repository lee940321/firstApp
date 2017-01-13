Ext.define("app.view.mem.MemLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.memlayout',
			title : "<center height=40>人员信息管理</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"mem_grid"
			},{
				xtype:"memform",
				hidden:true
			}]
});