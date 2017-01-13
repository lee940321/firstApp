/**
 * 宸﹁竟閮ㄥ垎
 */
Ext.define("app.view.WestView",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.westview',
	id:'tab_panel',
	collapsible: true,
	split: true,
	defaults: {
		bodyStyle: 'padding:2px'
	}, 	
	border:1,
	margins: '2 2 0 0',
	width: 225,
	minSize: 100,
	maxSize: 250,
	title:"功能模块导航",
	layout : 'accordion',
	layoutConfig :{
				titleCollapse: false,
				animate: true,
				activeOnTop: true
			},
	items:[{
		title:"用户管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{
	            		id:"membermanager",
	            		text:"家庭成员信息",
	            		iconCls:'member',
	            		leaf: true
	            	}
	        	]
    		}
		}]
	},{
		title:"账户管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [{ 
	            		text: "家庭现金账户管理",
	            		id:"cashmanager",
	            		iconCls:'account',
	            	 	leaf: true 
	            	},
	            	{
	            		id:"accountmanager",
	            		text:"银行账户管理",
	            		iconCls:'bank',
	            		leaf:true
	            	}
	        	]
    		}
		}]
	},{
		title:"收支管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{ 
	            		id:"inouttype",
	            		text: "收支类型", 
	            		iconCls: 'lx',
	            	 	leaf: true 
	            	},
	            	{ 
	            		id:"inoutlist",
	            		text: "收支明细", 
	            		iconCls: 'mx',
	            	 	leaf: true 
	            	},
	            	{
	            		id:"inoutchart1",
	            		text: "收支图形展示",
	            		iconCls: 'menu_reports',
	            		leaf: true
	            	}
	            
	        	]
    		}
		}]
	},{
		title:"其他信息管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{ 
	            		id:"bankmanager",
	            		text: "银行信息查询", 
	            		iconCls: 'bk',
	            	 	leaf: true 
	            	},
	            	{
	            		id:"housemanager",
	            		text: "家庭资产(房产、汽车等)",
	            		iconCls: 'zc',
	            		leaf: true
	            	}
	        	]
    		}
		}]
	},{
		title:"系统设置",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{ 
	            		id:"usermanager",
	            		text: "权限管理", 
	            		iconCls:'tree_user',
	            	 	leaf: true  
	            	}
	        	]
    		}
		}]
	}],
    initComponent: function(){
        this.callParent(arguments);
    }
});



