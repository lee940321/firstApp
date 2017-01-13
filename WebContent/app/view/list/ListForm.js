Ext.define("app.view.list.ListForm",{
	extend:"Ext.form.Panel",
	alias:"widget.listform",
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
		name:"listId",
		hidden:true
	},{
        xtype:'combobox',
		fieldLabel: '家庭成员',
		name : 'mName',
		emptyText:"请选择账户人",
		//editable: false,
	    store:Ext.create("app.store.mem.MemStore",{}),
	    forceSelection: true,
	    queryMode: 'remote',
	    displayField: 'memName',
	    valueField: 'memName',
	    labelWidth:100,
	    listeners:{
			select: function(combo,index,record){
				Ext.getCmp("acc").clearValue();
				var url = "/jtcw/account/atype.action?value="+combo.getValue();
				var store = Ext.data.StoreManager.lookup('acc_store');
				store.getProxy().url = url;
				store.load();
				/*
				store.load({
				   params:{
				   	  'value' : combo.getValue()
				   }
				});*/
			}
		}
    },{
    	xtype:'combobox',
		fieldLabel: '账户',
		id:'acc',
		name : 'aName',
		emptyText:"无账户",
	    store:Ext.create("app.store.acc.AtypeStore",{}),
	    forceSelection: true,
	    queryMode: 'remote',
	    displayField: 'aaa',
	    valueField: 'aaa',
	    labelWidth:100
    	
    },{
		xtype:"datefield",
		fieldLabel:"交易日期",
		name:"useDate",
		emptyText:"请选择",
		format:'Y-m-d',
		labelWidth:100
	},{
        xtype:'combobox',
		fieldLabel: '交易类型',
		name : 'tName',
		//editable: false,
	    store:Ext.create("app.store.iot.TypeStore",{}),
	    forceSelection: true,
	    queryMode: 'remote',
	    displayField: 'typeName',
	    valueField: 'typeName',
	    labelWidth:100,
	    listeners:{
			select: function(combo,index,record){
				Ext.getCmp("fff").clearValue();
				var store = Ext.data.StoreManager.lookup('flag_store');
				var url = "/jtcw/inouttype/type2.action?value="+combo.getValue();
				store.getProxy().url = url;
				store.load();/*
				store.load({
				   params:{
				   	  'value' : combo.getValue()
				   }
				});*/
			}
		}
    },{
       xtype:'combobox',
		fieldLabel: '交易详情',
		id:'fff',
		name : 'flag',
		emptyText:"请选择交易详情",
	    store:new Ext.data.Store({   
	        storeId:'flag_store',
	        model:'app.model.iot.IotModel',
	        proxy: {   
	                type: 'ajax',   
	                url : "",
	                reader:{
						type:"json",
						root:"rows",
						totalProperty :'totalCount'		
					}
	        },   
	        autoLoad:true   
        }),   
	    forceSelection: true,
	    queryMode: 'remote',
	    displayField: 'flag',
	    valueField: 'flag',
	    labelWidth:100
    },{
		xtype:"numberfield",
		fieldLabel:"金额",
		name:"useSum",
		minValue:"0"
	},{
		xtype:"numberfield",
		fieldLabel:"余额",
		name:"sum",
		minValue:"0",
		emptyText:"添加时不必填写"
	},{
		xtype:"textfield",
		fieldLabel:"备注",
		name:"memos"
	}],
	
	initComponent:function(){
		this.callParent(arguments);
	}
});