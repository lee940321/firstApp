Ext.define("app.view.cash.CashListForm",{
	extend:"Ext.form.Panel",
	alias:"widget.cashlistform",
	frame:true,
	algin:'center',
	tbar:[{
		xtype:"button",
		ref:"return",
		iconCls:"return",
		text:"返回"
	}],
	items:[
		{
		 	bodyStyle:'padding:1px 0px 0px 0px;background:transparent',
		 	border:0,
		 	layout : "absolute",
			items : [{
						x : 500,
						y : 0,
						ref : "dingdanInfo",
						xtype : "displayfield",
						id:"dingdan",
						value : ""
					}]
		},
		{
			title:'现金账户信息',
			xtype:'fieldset',
			items:[
				{
					bodyStyle:'padding:10px 0px 0px 55px;background:transparent',
					border:0,
					//frame:true,
			        layout:'column',
				    items: [{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
			                name : 'mName',
			                fieldLabel: '账户人',
			                labelWidth:60,
			                readOnly : true
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
			                name : 'cName',
			                fieldLabel: '账户',
			                labelWidth:60,
			                readOnly : true
				        },{
					        xtype: 'textfield',
			                name : 'cId',
			                fieldLabel: 'ID',
			                labelWidth:60,
			                hidden : true
				        }]				        
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
			                name : 'openDate',
			                fieldLabel: '开户日期',
			                labelWidth:60,
			                readOnly : true
				        }]
				    }]
				    
			    }
			    
			]
		},
		{//这里是一个grid
	    	title:'账户明细信息',
	    	xtype:'fieldset',
	    	layout:'fit',
	    	items:[{
	    		xtype:'cashlistgrid'
	    	}]
	    }
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});