Ext.define("app.view.cash.CashForm",{
	extend:"Ext.form.Panel",
	alias:"widget.cashform",
	layout : {
		type : "table",
		columns : 2
	},
	align:"left",
	defaults:{
		margin:"10 0 0 15",
		selectOnFocus:true,
		width:300,
		msgTarget:"side" //提示信息现在的位置
	},
	tbar:[{
		xtype:"button",
		ref:"save",
		hidden:pre?false:true,
		iconCls:"table_save",
		text:"保存"
	},{
		xtype:"button",
		ref:"return",
		iconCls:"return",
		text:"返回"
	}],
	items:[{
		xtype:"textfield",
		fieldLabel:"主键",
		name:"cId",
		hidden:true
	},{
		xtype:"textfield",
		fieldLabel:"账户账号",
		name:"cName",
		allowBlank : false,//不允许为空
		blankText : '不能为空',//错误提示内容 
		readOnly:false
	},{
        xtype:'combobox',
		fieldLabel: '持有人',
		name : 'mName',
		//editable: false,
	    store:Ext.create("app.store.mem.MemStore",{}),
	    forceSelection: true,
	    queryMode: 'remote',
	    displayField: 'memName',
	    valueField: 'memName',
	    labelWidth:100
    },{
		xtype:"datefield",
		fieldLabel:"开户日期",
		name:"openDate",
		emptyText:"请选择",
		format:'Y-m-d',
		labelWidth:100
	},{
		xtype:"numberfield",
		fieldLabel:"金额",
		name:"csum",
		minValue:"0"
	},{
        xtype:'combobox',
		fieldLabel: '现金类型',
		name : 'cType',
		//editable: false,
	    store: Ext.create('Ext.data.Store', {
					    fields: ['abbr', 'name'],
					    data : [
					    	{"abbr":"人民币", "name":"人民币"},
					        {"abbr":"美元", "name":"美元"},
					        {"abbr":"英镑", "name":"英镑"},
					        {"abbr":"欧元","name":"欧元"},
					        {"abbr":"日元","name":"日元"}
					        //...
					    ]
		}),
		value:"人民币",
	    forceSelection: true,
	    queryMode: 'local',
	    displayField: 'name',
	    valueField: 'abbr',
	    labelWidth:100
    },{
		xtype:"textfield",
		fieldLabel:"备注",
		name:"memos"
	},{
	    bodyStyle:'padding:1px 0px 0px 0px;background:transparent',
	 	border:0,
	 	layout : "absolute",
		items : [{
					xtype : "displayfield",
					value : "<font color=red>账户数据极为重要，添加后不允许修改，请谨慎填写!!!</font>"
		}]
	}],
	
	initComponent:function(){
		this.callParent(arguments);
	}
});