Ext.define("app.view.user.UserForm",{
	extend:"Ext.form.Panel",
	alias:"widget.userform",
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
		name:"userId",
		hidden:true
	},{
		xtype:"textfield",
		fieldLabel:"用户名",
		name:"userName",
		allowBlank : false,//不允许为空
		blankText : '用户名不能为空',//错误提示内容 
		readOnly:false
	},{
		xtype:"textfield",
		fieldLabel:"密码",
		inputType : 'password',  
		name:"userPwd",
		allowBlank : false,//不允许为空
		blankText : '密码不能为空',//错误提示内容 
		readOnly:false
	},{
        xtype:'combobox',
		fieldLabel: '权限',
		name : 'group',
		//editable: false,
	    store: Ext.create('Ext.data.Store', {
					    fields: ['abbr', 'name'],
					    data : [
					    	{"abbr":"管理员", "name":"管理员"},
					        {"abbr":"普通成员", "name":"普通成员"}
					        //...
					    ]
		}),
		emptyText:"请选择权限",
	    forceSelection: true,
	    queryMode: 'local',
	    displayField: 'name',
	    valueField: 'abbr',
	    labelWidth:100
    }],
	
	initComponent:function(){
		this.callParent(arguments);
	}
});