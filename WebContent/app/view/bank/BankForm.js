Ext.define("app.view.bank.BankForm",{
	extend:"Ext.form.Panel",
	alias:"widget.bankform",
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
		name:"bankId",
		hidden:true
	},{
		xtype:"textfield",
		fieldLabel:"银行名称",
		name:"bankName",
		allowBlank : false,//不允许为空
		blankText : '用户名不能为空',//错误提示内容 
		readOnly:false
	},{
		xtype:"textfield",
		fieldLabel:"银行缩写",
		name:"bshort"
	}],
	
	initComponent:function(){
		this.callParent(arguments);
	}
});