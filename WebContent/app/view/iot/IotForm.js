Ext.define("app.view.iot.IotForm",{
	extend:"Ext.form.Panel",
	alias:"widget.iotform",
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
		name:"typeId",
		hidden:true
	},{
        xtype:'combobox',
		fieldLabel: '收支类型',
		name : 'typeName',
		//editable: false,
	    store:Ext.create("app.store.iot.TypeStore",{}),
	//    forceSelection: true,
	    queryMode: 'local',
	    displayField: 'typeName',
	    valueField: 'typeName',
	    labelWidth:100
	},{
		xtype:"textfield",
		fieldLabel:"详细",
		name:"flag",
		allowBlank : false,//不允许为空
		blankText : '不能为空',//错误提示内容 
		readOnly:false
	}],
	
	initComponent:function(){
		this.callParent(arguments);
	}
});