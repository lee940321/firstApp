Ext.define("app.view.house.HouseGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.housegrid",
	store:"app.store.house.HouseStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'新增',ref:'add',iconCls:'table_add',hidden:pre?false:true},
		{xtype:'button',text:'删除',ref:'remove',iconCls:'table_remove',hidden:pre?false:true},
		"->",
		"按资产名称模糊查询:",
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("hName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("hName",this.getValue());
		    }
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.house.HouseStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"资产名称",dataIndex:"hName",width:150},
		{text:"所属类别",dataIndex:"hType",width:100},
		{text:"购置时间",dataIndex:"hDate",width:100},
		{text:"价值",dataIndex:"money",width:100},
		{text:"备注",dataIndex:"memos",width:100},
		{text:"图片名",dataIndex:"picture",width:100}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});