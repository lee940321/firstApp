Ext.define("app.view.acc.AccListGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.acclistgrid",
	store:"app.store.acc.AccListStore",
	height:400,
	border:0,
	frame:true,
	tbar:[
		'账户明细，请审阅！'
	],
/*	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.list.ListStore',
		dock:'bottom',
		displayInfo:true
	},*/
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"账户人",dataIndex:"mName",width:100,field:{
			xtype:"textfield"
		}},
		{text:"账户账号",dataIndex:"aName",width:150,field:{
			xtype:"textfield"
		}},
		{text:"交易日期",dataIndex:"useDate",width:100,field:{
			xtype:"textfield"
		}},
		{text:"收支类型",dataIndex:"tName",width:100,field:{
			xtype:"textfield"
		},renderer: function(value){
        		if(value=="收入"){
        			return "<font color=red>"+value+"</font>";
        		}else{
        			return "<font color=blue>"+value+"</font>";
        		}	
        }},
		{text:"收支详情",dataIndex:"flag",width:100,field:{
			xtype:"textfield"
		}},
		{text:"金额",dataIndex:"useSum",width:100,field:{
			xtype:"textfield"
		}},
		{text:"账户余额",dataIndex:"sum",width:100,field:{
			xtype:"textfield"
		}},
		{text:"备注",dataIndex:"memos",width:150,field:{
			xtype:"textfield"
		}}
	],
	initComponent:function(){
		//this.editing=Ext.create("Ext.grid.plugin.CellEditing");
		//this.plugins=[this.editing];
		this.callParent(arguments);
	}
});