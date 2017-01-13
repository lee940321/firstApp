/**图形视图布局类*/
Ext.define("app.view.chart.ChartLayout", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.chartlayout',
	title : "<center height=40>收支图形展示</center>",
	closable:true,
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'card',
	activeItem: 0,
	
	items:[ {
            xtype: 'chartpie'
        },
        {
            xtype: 'chartcolumn'
        },
        {
            xtype: 'chartbar'
        }],
	dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                text: '改变图形类型',
                iconCls: 'menu_reports',
                menu: {
                    xtype: 'menu',  
                    itemId: 'changeType', 
                    items: [
                        {
                            xtype: 'menuitem',
                            text: '饼图',
                            itemId: 'pie',
                            iconCls: 'chart_pie'
                        },
                        {
                            xtype: 'menuitem',
                            text: '柱形图1',
                            itemId: 'column',
                            iconCls: 'chart_bar'
                        },
                        {
                            xtype: 'menuitem',
                            text: '柱形图2',
                            itemId: 'bar',
                            iconCls: 'chart_column'
                        }
                    ]  
                } 
            },
            {
                text: '下载图片',
                iconCls: 'down',
                menu: {
                    xtype: 'menu',  
                    itemId: 'download',
                    items: [
                        
                        {
                            xtype: 'menuitem',
                            text: '图片下载',
                            itemId: 'svg',
                            iconCls: 'down1'
                        }
                    ]  
                } 
            },
            {           	
			        xtype:'combobox',
					fieldLabel: '请选择交易类别',
					name : 'tName',
					id : 'bbb',
				    store:Ext.create("app.store.iot.TypeStore",{}),
			//	    forceSelection: true,
				    queryMode: 'remote',
				    displayField: 'typeName',
				    valueField: 'typeName',
				    value: '收入',
				    listeners:{
			            scope: this,
			           'select': function(combo,record){
			           	    var value = Ext.getCmp("ccc").getValue();
				           	var type = record[0].data.typeName;
				         	var store = Ext.getStore("app.store.chart.ChartStore");
				         	var url = "/jtcw/inoutlist/chart.action";
		        	    	store.getProxy().url = url;
						    store.load({
							   params:{
							   	  'value' : value,
							   	  'type' : type
							   }
						    });			   
			            }
		  		    }		
		    },
            {           	
			        xtype:'combobox',
					fieldLabel: '请选择账户人',
					name : 'mName',
					id : 'ccc',
				    store:Ext.create("app.store.mem.MemStore",{}),				  
				    queryMode: 'remote',
				    displayField: 'memName',
				    valueField: 'memName',
				    listeners:{
			            scope: this,
			           'select': function(combo,record){
			           	    var type = Ext.getCmp("bbb").getValue();
				           	var value = record[0].data.memName;
				         	var store = Ext.getStore("app.store.chart.ChartStore");
				         	var url = "/jtcw/inoutlist/chart.action";
		        	    	store.getProxy().url = url;
						    store.load({
							   params:{
							   	  'value' : value,
							   	  'type' : type
							   }
						    });			   
			            }
		  		    }		    
            },
            "->",
            '提示：不选择账户人即显示全部家庭交易明细!!!'
		
            
        ]
    }]
});