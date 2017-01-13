Ext.define("app.controller.house.HouseController", {
	extend : "Ext.app.Controller",
	
	init : function() {
		var self = this;
		this.control({
			/**
			 * 添加House
			 */
			"housegrid button[ref=add]" : {
				click : function(btn) {
				var form = btn.up("houselayout").down("houseform");
					//清空数据
					form.getForm().reset();
					grid = form.up("houselayout").down("housegrid");
					grid.hide();
					form.show();
				}

             },
			/**
			 * 添加用户form的保存按钮
			 */
			"houseform button[ref=save]" : {
			    click : function(_btn){
					//1获得form
					var _form = _btn.ownerCt.ownerCt;
					var _grid = _btn.up("houselayout").down("housegrid");
					var id = _form.getForm().findField("hId").getValue();
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/house/add.action";
					}else{
						url = "/jtcw/house/update.action";
					}
					//alert(url);
					//2.把数据保存到数据库中去
					_form.submit({
						clientValidation : false,
						waitMsg : '正在进行处理,请稍后...', 
						url : url,
						method : 'POST',
						success : function(form, action) {
							var resObj = Ext.decode(action.response.responseText);
							if (resObj.success) {

								if(url != "/jtcw/house/update.action"){
									_form.getForm().reset();
								}else{
									_form.down("image").setSrc("images/picture/"+resObj.picture);
								}
								//3.把这条数据加到grid中
								_grid.getStore().load();

								Ext.Msg.alert("提示", "保存成功!");
							} else {
								Ext.Msg.alert("提示", "保存失败!");
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
			"houseform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("houseform");
					var grid = form.up("houselayout").down("housegrid");
					form.hide();
					grid.show();
				}
			},

			/**
			 * 删除
			 */
			"housegrid button[ref=remove]" : {
				click : function(btn){
					var grid = btn.up("housegrid");
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
							ids += records[i].get("hId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/house/delete.action",
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
			"housegrid" : {
				itemdblclick : function(_grid, record, item, index, e, eOpts) {
					var form = _grid.up("houselayout").down("houseform");
					var grid = form.up("houselayout").down("housegrid");
					//把选择的数据加载到form中去
					var _record = grid.getSelectionModel().getSelection();
					form.loadRecord(_record[0]);
					grid.hide();
					form.down("image").setSrc("images/picture/"+_record[0].get("picture"));
					form.show();
				}
			}

		});
	},
	views : [
		"app.view.house.HouseLayout",
		"app.view.house.HouseGrid",
		"app.view.house.HouseForm"
	],
	stores : ["app.store.house.HouseStore"],
	models : ["app.model.house.HouseModel"]
});