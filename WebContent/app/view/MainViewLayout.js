/**系统主程序界面布局类*/
Ext.define("app.view.MainViewLayout", {
			extend : 'Ext.panel.Panel',
			border : 0,
			layout : 'border',
			alias : 'widget.mainviewlayout',
			width : 10,
			height : 10,
			items : [{
						
						xtype : 'topview',
						region : 'north'
					}, {
						xtype : 'westview',
						region : 'west'
					}, {
						xtype : 'container',
						region : 'center',
						layout : 'fit',
						margins : '2 0 0 0',
						border : 0,
						items : [{
									xtype : 'centerview',
									border : 0
								}]
					}],
			initComponent : function() {
				this.callParent(arguments);
			}
		});