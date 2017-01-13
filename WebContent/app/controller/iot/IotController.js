Ext.define("app.controller.iot.IotController", {
	extend : "Ext.app.Controller",
	
	init : function() {
		var self = this;
		this.control({
			/**
			 * 添加iot
			 */
			"iotgrid button[ref=add]" : {
				click : function(btn) {
				var form = btn.up("iotlayout").down("iotform");
					//清空数据
					form.getForm().reset();
					grid = form.up("iotlayout").down("iotgrid");
					grid.hide();
					form.show();
				}

             },
			/**
			 * 添加用户form的保存按钮
			 */
			"iotform button[ref=save]" : {
			    click : function(btn) {
					//根据id值来做判断，如果id为null说明是做添加操作，否则就是做修改操作
					var grid = btn.up("iotlayout").down("iotgrid");
					//1获得form
					var form = btn.up("iotform");
					var id = form.getForm().findField("typeId").getValue();
									
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/inouttype/add.action";
					}else{
						url = "/jtcw/inouttype/update.action";
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
			"iotform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("iotform");
					var grid = form.up("iotlayout").down("iotgrid");
					form.hide();
					grid.show();
				}
			},

			/**
			 * 删除用户
			 */
			"iotgrid button[ref=del]" : {
				click : function(btn) {
					var grid = btn.up("iotgrid");
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
						data.push(Ext.JSON.encode(model.get('iotId')));
				    });
*/
					var ids = "";
					if(records.length>0)
					{
						for(var i=0;i<records.length;i++){
							ids += records[i].get("typeId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/inouttype/delete.action",
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
			"iotgrid" : {
				itemdblclick : function(_grid, record, item, index, e, eOpts) {
					var form = _grid.up("iotlayout").down("iotform");
					var grid = form.up("iotlayout").down("iotgrid");
					//把选择的数据加载到form中去
					var _record = grid.getSelectionModel().getSelection();
					form.loadRecord(_record[0]);
					grid.hide();
					form.show();
				}
			}

		});
	},
	views : [
		"app.view.iot.IotLayout",
		"app.view.iot.IotGrid",
		"app.view.iot.IotForm"
	],
	stores : ["app.store.iot.IotStore"],
	models : ["app.model.iot.IotModel"]
});