/**
 * ClassName 流程挂接视图
 * */
Ext.define("app.view.cash.CashGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.cashgrid",
	store:"app.store.cash.CashStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add',hidden:pre?false:true},
		{xtype:'button',text:'删除',ref:'del',iconCls:'table_remove',hidden:pre?false:true},
		{xtype:'button',text:'导出',ref:'look',iconCls:'table_edit',hidden:pre?false:true},
		"|",
		'提示：查看详细情况请双击记录',
		
		"->",
		'按账户查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("cName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("cName",this.getValue());
		    }
		},
		
		{xtype:'panel',width:15,border:0},
		'按账户人查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("mName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("mName",this.getValue());
		    }
		}		
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.cash.CashStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"现金账户",dataIndex:"cName",width:150,field:{
			xtype:"textfield"
		}},
		{text:"持有人",dataIndex:"mName",width:100,field:{
			xtype:"textfield"
		}},
		{text:"初始金额",dataIndex:"csum",width:100,field:{
			xtype:"textfield"
		}},
		{text:"开户时间",dataIndex:"openDate",width:100,field:{
			xtype:"textfield"
		}},
		{text:"现金类型",dataIndex:"cType",width:150,field:{
			xtype:"textfield"
		}},
		{text:"备注",dataIndex:"memos",width:150,field:{
			xtype:"textfield"
		}}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});