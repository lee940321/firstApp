Ext.define("app.controller.bank.BankController", {
	extend : "Ext.app.Controller",
	
	init : function() {
		var self = this;
		this.control({
			/**
			 * 添加bank
			 */
			"bankgrid button[ref=addBank]" : {
				click : function(btn) {
				var form = btn.up("banklayout").down("bankform");
					//清空数据
					form.getForm().reset();
					grid = form.up("banklayout").down("bankgrid");
					grid.hide();
					form.show();
				}

             },

			/**
			 * 添加用户form的保存按钮
			 */
			"bankform button[ref=save]" : {
			    click : function(btn) {
					//根据id值来做判断，如果id为null说明是做添加操作，否则就是做修改操作
					var grid = btn.up("banklayout").down("bankgrid");
					//1获得form
					var form = btn.up("bankform");
					var id = form.getForm().findField("bankId").getValue();
									
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/bank/add.action";
					}else{
						url = "/jtcw/bank/update.action";
					}					
						
					//2.把数据保存到数据库中去
     				
				        form.submit({
						clientValidation : true,
						waitMsg : '正在进行处理,请稍后...', 
						url : url,
						method : 'POST',
						success : function(form, action) {
							var resObj = Ext.decode(action.response.responseText);
							if (resObj!=null) {

								form.reset();
								//3.把这条数据加到grid中
								grid.getStore().load();

								Ext.Msg.alert("提示", "保存成功");
							} else {
								Ext.Msg.alert("提示", "保存失败");
							}
						},
						failure : function(form, action) {
							Ext.Msg.alert("提示","请求处理失败！");
						}
					});

     				
				   }
			},
			
			
			/**
			 * 添加用户form的返回按钮
			 */
			"bankform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("bankform");
					var grid = form.up("banklayout").down("bankgrid");
					form.hide();
					grid.show();
				}
			},

			/**
			 * 删除用户
			 */
			"bankgrid button[ref=removeBank]" : {
				click : function(btn) {
					var grid = btn.up("bankgrid");
					var store = grid.getStore();
					
					//你选择的将要删除的记录
					var records = grid.getSelectionModel().getSelection();
					if (!records || records.length <= 0) {
						Ext.Msg.alert("提示", "请选择需要删除的数据!");
						return;
					}
					// 根据id删除多条记录
/*					var data = [];
					Ext.Array.each(records, function(model) {
						data.push(Ext.JSON.encode(model.get('bankId')));
				    });
*/
					var ids = "";
					if(records.length>0)
					{
						for(var i=0;i<records.length;i++){
							ids += records[i].get("bankId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/bank/delete.action",
								params : {
								  'ids' : ids
								},// 根据id删除
								method : "POST",
								timeout : 4000,
								success : function(response, opts) {
									var resObj = response.responseText;
									
									if (resObj!=null) {
										// 不用查询，从grid中去掉对应的记录就OK了
										store.load();
										
										Ext.Msg.alert("提示","删除成功！");
									} else {
										Ext.Msg.alert("提示", "删除失败！");
									}
								}
					});
				    }//if
				}
			},
			/**
			 * 单击进入form，修改信息
			 */
			"bankgrid" : {
				itemdblclick : function(_grid, record, item, index, e, eOpts) {
					var form = _grid.up("banklayout").down("bankform");
					var grid = form.up("banklayout").down("bankgrid");
					//把选择的数据加载到form中去
					var _record = grid.getSelectionModel().getSelection();
					form.loadRecord(_record[0]);
					grid.hide();
					form.show();
				}
			},

			// 任务节点事件添加
			"taskeventgrid button[ref=addEvent]" : {
				click : function(btn) {
				}
			}

		});
	},
	views : [
		"app.view.bank.BankLayout",
		"app.view.bank.BankGrid",
		"app.view.bank.BankForm"
	],
	stores : ["app.store.bank.BankStore"],
	models : ["app.model.bank.BankModel"]
});