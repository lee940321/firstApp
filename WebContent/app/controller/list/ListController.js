Ext.define("app.controller.list.ListController", {
	extend : "Ext.app.Controller",
	
	init : function() {
		var self = this;
		this.control({

			"listgrid button[ref=add]" : {
				click : function(btn) {
				var form = btn.up("listlayout").down("listform");
					//清空数据
					form.getForm().reset();
					grid = form.up("listlayout").down("listgrid");
					grid.hide();
					form.show();
				}
             },
             
             /**excel导出*/
             "listgrid button[ref=excel]" : {
             	click : this.onExcelBtnClick
             },
             
             
             "listform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("listform");
					var grid = form.up("listlayout").down("listgrid");
					form.hide();
					grid.show();
				}
			},
			
			"listgrid" : {
				itemdblclick : function(_grid, record, item, index, e, eOpts) {
					var form = _grid.up("listlayout").down("listform");
					var grid = form.up("listlayout").down("listgrid");
					//把选择的数据加载到form中去
					var _record = grid.getSelectionModel().getSelection();
					form.loadRecord(_record[0]);
					grid.hide();
					form.show();
				}
			},
			
			"listform button[ref=save]" : {
			    click : function(btn) {
					//根据id值来做判断，如果id为null说明是做添加操作，否则就是做修改操作
					var grid = btn.up("listlayout").down("listgrid");
					//1获得form
					var form = btn.up("listform");
					var id = form.getForm().findField("listId").getValue();
									
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/inoutlist/add.action";
					}else{
						url = "/jtcw/inoutlist/update.action";
					}					
						
					//2.把数据保存到数据库中去
     				
				        form.submit({
						clientValidation : true,
						waitMsg : '正在进行处理,请稍后...', 
						url : url,
						method : 'POST',
						success : function(form, action) {
							var resObj = Ext.decode(action.response.responseText);
							if (resObj.success) {

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
			
			"listgrid button[ref=del]" : {
				click : function(btn) {
					var grid = btn.up("listgrid");
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
							ids += records[i].get("listId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/inoutlist/delete.action",
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
			}
			
		});
	},
	
	onExcelBtnClick: function(button, e, eOpts) {
		  window.open('/jtcw/inoutlist/excel.action');
		  
	},
	
	
	views : [
		"app.view.list.ListLayout",
		"app.view.list.ListGrid",
		"app.view.list.ListForm"
	],
	stores : ["app.store.list.ListStore"],
	models : ["app.model.list.ListModel"]
});