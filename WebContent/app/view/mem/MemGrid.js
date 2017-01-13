/**
 * 人员信息列表视图类
 * */
Ext.define("app.view.mem.MemGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.mem_grid",
	store:"app.store.mem.MemStore",
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
		'按姓名查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("memName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("memName",this.getValue());
		    }
		},
		'按职业查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("job",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("job",this.getValue());
		    }
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.mem.MemStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"姓名",dataIndex:"memName",width:100,field:{
			xtype:"textfield"
		}},
		{text:"性别",dataIndex:"sex",width:50,field:{
			xtype:"textfield"
		}},
		{text:"出生日期",dataIndex:"birth",width:100,field:{
			xtype:"textfield"
		}},
		{text:"手机",dataIndex:"mobile",width:150,field:{
			xtype:"textfield"
		}},
		{text:"职业",dataIndex:"job",width:150,field:{
			xtype:"textfield"
		}},
		{text:"图片文件名",dataIndex:"picture",width:150,field:{
			xtype:"textfield"
		}}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});