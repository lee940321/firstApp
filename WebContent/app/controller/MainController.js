/**主控制器*/
Ext.define("app.controller.MainController",{
	extend : "Ext.app.Controller",
	init : function(){
		var self = this;
		
		
		
		/**公用添加页面的方法*/
		/**
		 * 动态加载controller并渲染它的主窗体
		 */
		this.addFunItem=function(funInfo){
			if(funInfo){
				var mainView=funInfo.mainView;
				var funPanel=mainView.down(funInfo.funViewXtype);
				if(!funPanel){
					self.application.getController(funInfo.funController).init();
					funPanel=Ext.create(funInfo.funViewName);
					mainView.add(funPanel);
					mainView.setActiveTab(funPanel);
				}else{									
					mainView.setActiveTab(funPanel);
				}
			}
		},
		/**下在是控制部分*/
		this.control({
			/**控制登录窗口的登录*/
			"loginwindow button[ref=login]":{
				click : function(btn){
					var remember = btn.up("loginwindow").down("checkbox[name=remember]");
					var autologin = btn.up("loginwindow").down("checkbox[name=autologin]");
					var loginWin = btn.up("loginwindow");
					var UserName = loginWin.down("form").getForm().findField("UserName").getValue();
					var UserPwd = loginWin.down("form").getForm().findField("UserPwd").getValue();
					/**MD5加密密码*/
					Ext.Ajax.request({
						waitMsg : '正在登陆,请稍后...', 
						url:"/jtcw/user/login.action",
						params:{UserName:UserName,UserPwd:UserPwd},
						method:"POST",
						timeout:4000,
						success:function(response,opts){
							var resObj=Ext.decode(response.responseText);
							if(resObj.success){
								var userObj=resObj.obj;
								var dis=Ext.getCmp("displaylogin");
								dis.setValue("<font color=red><b>"+UserName+" 您好</b></font>");
								
								if(!resObj.admin){
								    pre = false;
								}else{
									pre = true;
								}
								//登陆成功后设置cookie
								if(remember.getValue()){
									Ext.util.Cookies.set("UserName",UserName);
									Ext.util.Cookies.set("UserPwd",UserPwd);
									Ext.util.Cookies.set("remember",remember.getValue());
									if(autologin.getValue()){
										Ext.util.Cookies.set("autologin",true);
										
									}else{
										Ext.util.Cookies.clear("autologin");
									}
								}else{
									Ext.util.Cookies.clear("UserName");
									Ext.util.Cookies.clear("UserPwd");
									Ext.util.Cookies.clear("remember");
								}
								
								btn.up("loginwindow").close();
								
							}else{
								Ext.Msg.alert("提示","用户名和密码错误");
							}
						}
			 		});
					
				}
			},
			
			
			/**注销*/
			"topview button[ref=logout]" : {
				click: function(btn){
					var dis=Ext.getCmp("displaylogin");
					dis.setValue("<font color=white><b>未登录</b></font>");
								
					Ext.util.Cookies.clear("autologin");
					window.location.reload();
				}
			},
			
			"topview button[ref=exit]" : {
				click: function(btn){
					Ext.Msg.confirm("提示","是否退出系统",function(btn){
						if(btn == 'yes'){							
                            window.location.reload();
						}
					},this);
				}
			},
			

			"westview treepanel":{
				itemclick:function(tree,record,item,index,e,eOpts){
					var mainView=tree.up("mainviewlayout").down("centerview");
					/**用户管理*/
					if(record.data["id"]=="usermanager"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"userlayout",
							funController:"app.controller.user.UserController",
							funViewName:"app.view.user.UserLayout"
						});
						/**人员信息管理*/
					}else if(record.data["id"]=="membermanager"){	
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"memlayout",
							funController:"app.controller.mem.MemController",
							funViewName:"app.view.mem.MemLayout"
						});
						/**家庭账户管理*/
					}else if(record.data["id"]=="cashmanager"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"cashlayout",
							funController:"app.controller.cash.CashController",
							funViewName:"app.view.cash.CashLayout"
						});
						/**银行账户管理*/
					}else if(record.data["id"]=="accountmanager"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"acclayout",
							funController:"app.controller.acc.AccController",
							funViewName:"app.view.acc.AccLayout"
						});
						/**收支类型管理*/
					}else if(record.data["id"]=="inouttype"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"iotlayout",
							funController:"app.controller.iot.IotController",
							funViewName:"app.view.iot.IotLayout"
						});
						/**收支明细表*/
					}else if(record.data["id"]=="inoutlist"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"listlayout",
							funController:"app.controller.list.ListController",
							funViewName:"app.view.list.ListLayout"
						});
						/**收入图形展示*/
					}else if(record.data["id"]=="inoutchart1"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"chartlayout",
							funController:"app.controller.chart.ChartController",
							funViewName:"app.view.chart.ChartLayout"
						});
						/**银行管理*/
					}else if(record.data["id"]=="bankmanager"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"banklayout",
							funController:"app.controller.bank.BankController",
							funViewName:"app.view.bank.BankLayout"
						});	
						/**家庭大型资产管理*/
					}else if(record.data["id"]=="housemanager"){
						self.addFunItem({
							mainView:mainView,
							funViewXtype:"houselayout",
							funController:"app.controller.house.HouseController",
							funViewName:"app.view.house.HouseLayout"
						});	
					}
				}//itemclick end
			}//"westview treepanel" end
		});
	},
	
	
	requires: [
	    "app.util.MD5"
	],
	views : [
	    "app.view.center.CenterForm",
		"app.view.TopView",
		"app.view.WestView",
		"app.view.CenterView",
		"app.view.MainViewLayout"
		
	],
	
	store : [],
	model : []
});