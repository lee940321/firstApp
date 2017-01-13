Ext.define("app.controller.cash.CashController", {
	extend : "Ext.app.Controller",
	mixins : {
		formUtils : "app.util.FormUtils"
	},
	init : function() {
		var self = this;
		this.control({

			/**
			 * 添加
			 */
			"cashgrid button[ref=add]" : {
				click : function(btn) {
				var form = btn.up("cashlayout").down("cashform");
					//清空数据
					form.getForm().reset();
					grid = form.up("cashlayout").down("cashgrid");
					grid.hide();
					form.show();
				}

             },

			/**
			 * 添加form的保存按钮
			 */
			"cashform button[ref=save]" : {
			    click : function(btn) {
					//根据id值来做判断，如果id为null说明是做添加操作，否则就是做修改操作
					var grid = btn.up("cashlayout").down("cashgrid");
					//1获得form
					var form = btn.up("cashform");
					var id = form.getForm().findField("cId").getValue();
									
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/cash/add.action";
					}else{
						url = "/jtcw/cash/update.action";
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
			 * 添加form的返回按钮
			 */
			"cashform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("cashform");
					var grid = form.up("cashlayout").down("cashgrid");
					form.hide();
					grid.show();
				}
			},

			/**
			 * 删除用户
			 */
			"cashgrid button[ref=del]" : {
				click : function(btn) {
					var grid = btn.up("cashgrid");
					var store = grid.getStore();
					
					//你选择的将要删除的记录
					var records = grid.getSelectionModel().getSelection();
					if (!records || records.length <= 0) {
						Ext.Msg.alert("提示", "请选择需要删除的数据!");
						return;
					}
					// 根据id删除多条记录
					var ids = "";
					if(records.length>0)
					{
						for(var i=0;i<records.length;i++){
							ids += records[i].get("cId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/cash/delete.action",
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
			 * 添加form的明细按钮
			 */
			"cashgrid button[ref=look]":{
				click:function(btn){
					window.open('/jtcw/cash/excel.action');
				}
			},
			/**cashlistform的返回*/
			"cashlistform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("cashlistform");
					var grid = form.up("cashlayout").down("cashgrid");
					form.hide();
					grid.show();
				}
			},
			
			/**
			 * 双击查看明细
			 */
			"cashgrid" : {
				itemdblclick : function(grid, record, item, index, e, eOpts) {
					var form = grid.up("cashlayout").down("cashlistform");
					self.resetFormInfo(form);
					form = grid.up("cashlayout").down("cashlistform");
					var formObj = form.getForm();
					grid = form.up("cashlayout").down("cashgrid");
					var records = grid.getSelectionModel().getSelection();
					var obj = records[0].data;
					// 把对象值放入form中
					self.setFormValue(formObj, obj);
				
					var cashlistgrid = form.down("cashlistgrid");
					var cashlistStore = cashlistgrid.getStore();  //刷选出该账户的明细
					var aName = records[0].data.cName;
					var url = "/jtcw/cash/list_show.action?aName="+aName;
					cashlistStore.getProxy().url = url; 
					//store加载提示
					//self.storeTip(saleitemStore);
					cashlistStore.load();
					form.down('displayfield').setValue("<h1><center><font size=5>账户明细</font></center></h1>");		
					grid.hide();
					form.show();
				}
			}
		});
	},
	views : [
		"app.view.cash.CashLayout",
		"app.view.cash.CashGrid",
		"app.view.cash.CashForm",
		"app.view.cash.CashListForm",
		"app.view.cash.CashListGrid"
	],
	stores : ["app.store.cash.CashStore","app.store.cash.CashListStore"],
	models : ["app.model.cash.CashModel","app.model.list.ListModel"]
});