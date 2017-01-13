/**
 * 收支类型列表视图类
 * */
Ext.define("app.view.iot.IotGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.iotgrid",
	store:"app.store.iot.IotStore",
	border:0,
	selModel:{
		selType:"checkboxmodel"
	},
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add',hidden:pre?false:true},	
		{xtype:'button',text:'删除',ref:'del',iconCls:'table_remove',hidden:pre?false:true},
		"->",
		'按收支类型查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("typeName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("typeName",this.getValue());
		    }
		},
		'按详细查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("flag",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("flag",this.getValue());
		    }
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.iot.IotStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"收支类型",dataIndex:"typeName",width:100,field:{
			xtype:"textfield"
		},renderer: function(value){
        		if(value=="收入"){
        			return "<font color=red>"+value+"</font>";
        		}else{
        			return "<font color=blue>"+value+"</font>";
        		}	
        }},
		{text:"详细",dataIndex:"flag",width:100,field:{
			xtype:"textfield"
		}}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});