/**
 * ClassName 流程挂接视图
 * */
Ext.define("app.view.bank.BankGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.bankgrid",
	store:"app.store.bank.BankStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'新增',ref:'addBank',iconCls:'table_add',hidden:pre?false:true},
		{xtype:'button',text:'删除',ref:'removeBank',iconCls:'table_remove',hidden:pre?false:true},
		"->",
		"按银行名称模糊查询:",
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("bankName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("bankName",this.getValue());
		    }
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.bank.BankStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"银行名称",dataIndex:"bankName",width:100},
		{text:"银行缩写",dataIndex:"bshort",width:100}
		
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});