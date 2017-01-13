/**
 * ClassName 流程挂接视图
 * */
Ext.define("app.view.user.UserGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.usergrid",
	id:'list',
	store:"app.store.user.UserStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'新增用户',ref:'addUser',iconCls:'table_add',hidden:pre?false:true},
		{xtype:'button',text:'修改用户',ref:'updateUser',iconCls:'table_edit',hidden:pre?false:true},
		{xtype:'button',text:'删除用户',ref:'removeUser',iconCls:'table_remove',hidden:pre?false:true},
		"->",
		"按用户名模糊查询:",
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("userName",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("userName",this.getValue());
		    }
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.user.UserStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"用户名称",dataIndex:"userName",width:100},
		{text:"用户密码",dataIndex:"userPwd",width:100},
		{text:"权限",dataIndex:"group",width:100,field:{
			xtype:"textfield"
		},renderer: function(value){
        		if(value=="管理员"){
        			return "<font color=red>"+value+"</font>";
        		}else{
        			return "<font color=blue>"+value+"</font>";
        		}	
        }}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});