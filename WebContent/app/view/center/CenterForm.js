Ext.define("app.view.center.CenterForm",{
	extend:"Ext.form.Panel",
	alias:"widget.centerform",
//	frame:true,
	
	algin:'center',

	items:[
		{
		 	bodyStyle:'padding:10px 0px 50px 0px;background:transparent',
		 	border:0,
		 	layout : "absolute",
		 	
			items : [
			{
				xtype: 'label',
			    width: 100,
			    x : 600,
				y : 0,
				style:'color:blue; font-size:14px;',
//			    margins: {left: 1},
			    id: 'clock',
			    listeners: {
			      'render': function() {					       
					    Ext.TaskManager.start({
					    run: function() {
					      Ext.getCmp("clock").setText(Ext.Date.format(new Date(), 'g:i:s A'));
					    },
					    interval: 1000
					  });
					}					      
			    }
			}
			]
		},
		{
			title:'<font color=blue size=3>家庭理财中心</font>',
			xtype:'fieldset',
			items:[
				{
					bodyStyle:'padding:10px 0px 0px 55px;background:transparent',
					border:2,
					//frame:true,
			        layout:'column',
				    items: [{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'lastS',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:red' , 
			                name : 'lastS',
			                fieldLabel: '去年总收入',
			                labelWidth:70
			           //     readOnly : true
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'lastZ',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:green',
			                name : 'lastZ',
			                fieldLabel: '去年总支出',
			                labelWidth:70
			         //       readOnly : true
				        }]				        
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'lastSum',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:#FF44AA;' ,
			                name : 'lastSum',
			                fieldLabel: '去年总盈亏',
			                labelWidth:70
			                
				        }]
				    },
				    {
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'thisS',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:red' ,
			                name : 'thisS',
			                fieldLabel: '今年已收入',
			                labelWidth:70
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'thisZ',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:green' ,
			                name : 'thisZ',
			                fieldLabel: '今年已支出',
			                labelWidth:70
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'thisSum',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:#FF44AA;' ,
			                name : 'thisSum',
			                fieldLabel: '今年总盈亏',
			                labelWidth:70
			 
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'allS',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:red' ,
			                name : 'allS',
			                fieldLabel: '全部总收入',
			                labelWidth:70
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'allZ',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:green' ,
			                name : 'allZ',
			                fieldLabel: '全部总支出',
			                labelWidth:70
			               
				        }]
				    },{
				        columnWidth: 0.33,
				        bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
						border:0,
				        items:[{
					        xtype: 'textfield',
					        id:'allSum',
					        fieldStyle:'background-color: #ffffff;border-color: #ffffff; background-image: none;color:#FF44AA;' ,
			                name : 'allSum',
			                fieldLabel: '全部盈亏',
			                labelWidth:60
				        }]
				    }]	    
			    }		    
			]
		},
		
		
		{
			title:'<font color=blue size=3>理财格言</font>',
			xtype:'fieldset',
			items:[
			{
				bodyStyle:'padding:10px 0px 10px 55px;background:transparent',
				border:5,
				//frame:true,
		        layout:'column',
		        items:[{
		        	xtype : "displayfield",
					value : "<font size=3>★健康投资是最佳的首选：投资项目生命是人生的根基，而健康是生命的基本保证和追求人生理想的前提条件，是最大的财富。嬴得健康才能嬴得生命，赢得生命才能嬴得时间，时间就是金钱。</font>"
		        
		        },{
		        	xtype : "displayfield",
					value : "<font size=3>★金钱在于运动：金钱的本质在于流动，钱是不能休眠的。当今经济社会发展日新月异，资金只能在投资流通中才能不断实现保值和增值。投资失误是损失，资金停滞不动也是损失。</font>"
		        
		        },{
		        	xtype : "displayfield",
					value : "<font size=3>★投资没有常胜将军市场经济瞬息万变，投资也有不测风云。要想掌握投资诀窍，难免需付点学费。钱是身外之物，当发现决策错误，要舍得;割肉，有时暂时的放弃是为了更多的收获。</font>"
		        
		        },{
		        	xtype : "displayfield",
					value : "<font size=3>★投资要有战略眼光：短线投资目光不能短视，长线投资也要有辩证的发展眼光，今天的朝阳产业也许明天会变为夕阳产业。选择好的投资，小钱会生大钱。反之，则可能会像”肉包子打狗，有去无回。</font>"
		        
		        },{
		        	xtype : "displayfield",
					value : "<font size=3>★金钱本身无”清浊”之分：在现代经济社会生活中，金钱不是万能的，但没有金钱是万万不能的。金钱的满足是没有止境的，而生命对每个人来说又是有限的。因此，赚钱要适度，要有满足感。</font>"
		        
		        },{
		        	xtype : "displayfield",
					value : "<font size=3>★投资理财的最佳顾问是你自己：不要盲从别人，不要迷信专家。因为行家的分析未必都是对的，而要靠自己的耳朵去听正确的消息，靠自己的眼睛去看实际的情况，用自己的大脑去分析与判断，寻找最佳的投资方案和途径。</font>"
		        
		        }]
			}
			]
		}
	
	],
	
	afterRender:function()    //前后台AJAX交互，使得数据库的值显示在面板上
    {
     	this.callParent(arguments);
     	Ext.Ajax.request({
			url : '/jtcw/center/list.action',
			method : 'post',
			scope : this,
			success : function(response) {
				var resObj = Ext.decode(response.responseText);
				Ext.getCmp('lastS').setValue(resObj.lastS);
				Ext.getCmp('lastZ').setValue(resObj.lastZ);
				Ext.getCmp('lastSum').setValue(resObj.lastSum);
				Ext.getCmp('thisS').setValue(resObj.thisS);
				Ext.getCmp('thisZ').setValue(resObj.thisZ);
				Ext.getCmp('thisSum').setValue(resObj.thisSum);
				Ext.getCmp('allS').setValue(resObj.allS);
				Ext.getCmp('allZ').setValue(resObj.allZ);
				Ext.getCmp('allSum').setValue(resObj.allSum);
			}
		});
		
    },
	initComponent:function(){
		this.callParent(arguments);
	}
});