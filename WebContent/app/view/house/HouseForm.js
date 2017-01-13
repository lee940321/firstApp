Ext.define('app.view.house.HouseForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.houseform',
    //requires: ['Ext.form.Panel'],
    //height: 380,
   // width: 300,
	bodyStyle: 'padding:5px 5px 5px 5px',
	border:0,
	//frame:true,
	enctype: 'multipart/form-data',//把文件以二进制流的方式传递到服务器
	fileUpload : true,
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
	    bodyStyle: 'background:transparent',//设置为透明,不妨碍更换主题了
		border:0,
	    layout:'column',
	    items: [{
	        columnWidth: 0.5,
	        xtype:'fieldset',
			title:'家庭资产信息',
	        items:[{
		        xtype: 'textfield',
                name : 'hId',
                fieldLabel: 'id',
                labelWidth:60,
                allowBlank: false,
                hidden : true
	        },{
		        xtype: 'textfield',
                name : 'hName',
                fieldLabel: '资产名称',
                labelWidth:60,
                allowBlank: false
	        },{
		        xtype: 'textfield',
                name : 'hType',
                fieldLabel: '所属类别',
                labelWidth:60,
                allowBlank: false
	        },{
		        xtype:"datefield",
				fieldLabel:"购置日期",
				name:"hDate",
				emptyText:"请选择",
				format:'Y-m-d',
				labelWidth:60
	        },{
		        xtype: 'textfield',
                name : 'money',
                fieldLabel: '资产价值',
                labelWidth:60
	        },{
		        xtype: 'textfield',
                name : 'memos',
                fieldLabel: '备注',
                labelWidth:60
	        },{
	        	height:192,
	        	bodyStyle: 'background:transparent',//设置为透明,不妨碍更换主题了
				border:0
	        }]
	    },{width:5,bodyStyle: 'background:transparent',border:0},{
	        columnWidth: 0.5,
	        xtype:'fieldset',
			title:'照片上传',
	        items:[{
	        	xtype:'filefield',
				name:'pictures',
		       	labelWidth:60,
		       	msgTarget: 'side',
		       	anchor: '100%',
		       	buttonText: '选择照片',
		       	fieldLabel : '上传图片'
			},{
			   xtype : 'image',   
		       width:500,
		       height:300
			}]
	    }]

                
    }],
    initComponent: function() {
        this.callParent(arguments);
    }
});
