/**
 * ClassName 流程挂接视图
 * */
Ext.define("app.view.list.ListGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.listgrid",
	store:"app.store.list.ListStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add',hidden:pre?false:true},
		{xtype:'button',text:'删除',ref:'del',iconCls:'table_remove',hidden:pre?false:true},
		{xtype:'button',text:'导出',ref:'excel',iconCls:'down'},
		"->",
		'按交易日期查询:',
		{
			xtype: 'datefield',
			format:'Y-m-d',
			store:Ext.create("app.store.list.DateStore",{}),
			listeners:{
            	"select":function(){
            		var value = Ext.util.Format.date(this.getValue(), 'Y-m-d');
            		
            	    var store = this.ownerCt.ownerCt.getStore();
          	    
            	    var myDate = new Date();
            	    if(this.getValue()>myDate)
            	    {
            	    	var url = "/jtcw/inoutlist/list.action"
            	    	store.getProxy().url = url;
				        store.load();
            	    	store.clearFilter(false);
            	    }else{
            	    
            	    var url = "/jtcw/inoutlist/list_date.action?value="+value;
        	    	store.getProxy().url = url;
				    store.load();
				    store.clearFilter(false);
            	    store.filter("useDate",value);
            	    }
              }
            }
		},
		
		{xtype:'panel',width:15,border:0},
		'按收支类型查询:',
		{
			xtype: 'triggerfield', 
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			listeners:{
            	"change":function(_this,_new,_old,_opt){ 
            		var _store = _this.ownerCt.ownerCt.getStore();
            		_store.clearFilter(false);
            		_store.filter("flag",_new);
                }
            },
            onTriggerClick: function() {
            	var _store = this.ownerCt.ownerCt.getStore();
            	_store.clearFilter(false);
            	_store.filter("flag",this.getValue());
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
		}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'app.store.list.ListStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"账户人",dataIndex:"mName",width:50,field:{
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
		this.callParent(arguments);
	}
});