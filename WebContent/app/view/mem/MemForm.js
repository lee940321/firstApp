Ext.define('app.view.mem.MemForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.memform',
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
			title:'家庭人员信息',
	        items:[{
		        xtype: 'textfield',
                name : 'memId',
                fieldLabel: 'id',
                labelWidth:60,
                allowBlank: false,
                hidden : true
	        },{
		        xtype: 'textfield',
                name : 'memName',
                fieldLabel: '姓名',
                labelWidth:60,
                allowBlank: false
	        },{
		        xtype:'combobox',
				fieldLabel: '性别',
				name : 'sex',
				//editable: false,
			    store:Ext.create("app.store.mem.SexStore",{}),
			    forceSelection: true,
			    queryMode: 'local',
			    displayField: 'sexName',
			    valueField: 'sexId',
			    labelWidth:60
	        },{
		        xtype:"datefield",
				fieldLabel:"出生日期",
				name:"birth",
				emptyText:"请选择",
				format:'Y-m-d',
				labelWidth:60
	        },{
		        xtype: 'textfield',
                name : 'mobile',
                fieldLabel: '手机',
                labelWidth:60
	        },{
		        xtype: 'textfield',
                name : 'job',
                fieldLabel: '工作',
                labelWidth:60
	        },{
	        	height:153,
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
		       width:400,
		       height:300
			}]
	    }]

                
    }],
    initComponent: function() {
        this.callParent(arguments);
    }
});
