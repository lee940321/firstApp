/**
 * ClassName 流程挂接视图
 * */
Ext.define("app.view.acc.AccGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.accgrid",
	store:"app.store.acc.AccStore",
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
            		_store.filter("atype",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("atype",this.getValue());
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
		},
		{xtype:'panel',width:15,border:0},
		{xtype:'combobox',width:175,
			fieldLabel: '请选择账户银行',
		   store:Ext.create("app.store.bank.BankStore",{}),
		    queryMode: 'remote',
		    displayField: 'bshort',
		    valueField: 'bankId',
		    value:"ALL",
		    listeners:{
		         scope: this,
		         'select': function(combo,record){
		         	var store = combo.ownerCt.ownerCt.getStore();
		         	if(record[0].data.bshort == "ALL"){
		         		store.clearFilter(false);
		         	}else{
			         	store.clearFilter(false);
			         	store.filter("bName", record[0].data.bshort);
		         	}
		         }
		    }

		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.acc.AccStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"银行账户",dataIndex:"atype",width:150,field:{
			xtype:"textfield"
		}},
		{text:"开户银行",dataIndex:"bName",width:100,field:{
			xtype:"textfield"
		}},
		{text:"持有人",dataIndex:"mName",width:50,field:{
			xtype:"textfield"
		}},
		{text:"开户日期",dataIndex:"openDate",width:100,field:{
			xtype:"textfield"
		}},
		{text:"开户地点",dataIndex:"flag",width:100,field:{
			xtype:"textfield"
		}},
		{text:"金额",dataIndex:"asum",width:100,field:{
			xtype:"textfield"
		}},
		{text:"现金类型",dataIndex:"picture",width:150,field:{
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