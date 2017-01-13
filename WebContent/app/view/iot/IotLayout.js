Ext.define("app.view.iot.IotLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.iotlayout',
			title : "<center height=40>收支类型管理</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"iotgrid"
			},{
				xtype:"iotform",
				hidden:true
			}]
});