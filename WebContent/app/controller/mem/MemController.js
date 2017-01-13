Ext.define("app.controller.mem.MemController", {
	extend : "Ext.app.Controller",
	init : function() {
		var self = this;
		this.control({
			
			/**memgrid的添加按钮事件*/
			"mem_grid button[ref='add']" : {
				click : function(_btn){
					var grid = _btn.up("memlayout").down("mem_grid");
					var form = grid.up("memlayout").down("memform");
					form.getForm().reset();
					form.show();
					grid.hide();
				}
			},
			/**memgrid的添加按钮事件*/
			"mem_grid button[ref='del']" : {
				click : function(btn){
					var grid = btn.up("mem_grid");
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
							ids += records[i].get("memId") + ",";
						}
					
					Ext.Ajax.request({
								waitMsg : '正在进行处理,请稍后...', 
								url : "/jtcw/member/delete.action",
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
			/**memgrid双击事件响应*/
			"mem_grid" : {
				itemdblclick : function(_grid, record, item, index, e, eOpts) {
					var form = _grid.up("memlayout").down("memform");
					var grid = form.up("memlayout").down("mem_grid");
					//把选择的数据加载到form中去
					var _record = grid.getSelectionModel().getSelection();
					form.loadRecord(_record[0]);
					grid.hide();
					form.down("image").setSrc("images/picture/"+_record[0].get("picture"));
					form.show();
				}
			},
			
			/**===============================================*/
			"memform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("memform");
					var grid = form.up("memlayout").down("mem_grid");
					form.hide();
					grid.show();
				}
			},
			
			/**memform的保存按钮事件*/
			"memform button[ref=save]" : {
				click : function(_btn){
					//1获得form
					var _form = _btn.ownerCt.ownerCt;
					var _grid = _btn.up("memlayout").down("mem_grid");
					var id = _form.getForm().findField("memId").getValue();
					var url = "";
					if(id == "" || null == id){
						url = "/jtcw/member/add.action";
					}else{
						url = "/jtcw/member/update.action";
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

								if(url != "/jtcw/member/update.action"){
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
			}
			
			
		});
	},
	views : ["app.view.mem.MemLayout","app.view.mem.MemGrid","app.view.mem.MemForm"],
	stores : ["app.store.mem.MemStore"],
	models : ["app.model.mem.MemModel"]
});