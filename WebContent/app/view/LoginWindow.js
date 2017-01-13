
Ext.define('app.view.LoginWindow', {
	extend : 'Ext.window.Window',
	title : "登录系统",
	iconCls:'table_login',
	width : 400,
	height : 230,
	alias:"widget.loginwindow",
	modal : true,
	closable : false,
	closeAction:"destroy",
	//layout : "column",
	listeners : {
		show:function(_this){
			/**显示之后如果用户是自动登陆的情况就关闭窗口*/
			var UserName = Ext.util.Cookies.get("UserName");
			var UserPwd = Ext.util.Cookies.get("UserPwd");
			var autologin = Ext.util.Cookies.get("autologin");
			var remember = Ext.util.Cookies.get("remember");
			//设置表单值
			_this.down("form").getForm().findField("UserName").setValue(UserName);
			_this.down("form").getForm().findField("UserPwd").setValue(UserPwd);
			_this.down("checkbox[name=remember]").setValue(remember);
			_this.down("checkbox[name=autologin]").setValue(autologin);
			//如果是自动登陆的情况
			if(Ext.util.Cookies.get("autologin")){
				//用Ext.util.Cookies.get("username")和Ext.util.Cookies.get("password")直接去登陆，成功就关闭窗口
				Ext.Ajax.request({
						url:"/jtcw/user/login.action",
						waitMsg : '正在登陆,请稍后...',
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
								_this.close();
							}else{
								Ext.Msg.alert("提示","用户名和密码错误");
							}
						}
			 		});
			}
		}
	
	},
	items:[{
		ref : "logininfo",
		xtype : "displayfield",
		value : "",
		height:30,
		margin : "0 0 0 0"
	},{
		layout : "column",
		bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
		border:0,
		items : [{
			columnWidth:.7,
			xtype : "form",
			ref:"loginform",
			defaults : {
				labelSeparator : ':',
				labelWidth : 40,
				width : 200,
				//allowBlank : false,
				labelAlign : 'right',
				msgTarget : 'side'
			},
			defaultType : 'textfield',
			bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
			border:0,
			items : [ {
				fieldLabel : "用&nbsp;户&nbsp;名&nbsp;:",
				//selectOnFocus : true,
				fieldCls : 'username',
				emptyText:"请输入用户名",
				//regex : /([A-Za-z]{1})\w{1,19}/,
				//regexText : '用户名格式有误',
				name : 'UserName',
				margin : "10 0 0 50",
				listeners:{
					change: function(_this,newV,oldV){
						var password = _this.up("form").getForm().findField("UserPwd");
						if(Ext.util.Cookies.get("UserName") != null){
							if(newV == Ext.util.Cookies.get("UserName")){
								password.setValue(Ext.util.Cookies.get("UserPwd"));
							}else{
								password.setValue("");
							}
						}
					}
				}
			}, {
				name : 'UserPwd',
				//selectOnFocus : true,
				fieldLabel : '密&nbsp;&nbsp;&nbsp;码',
				fieldCls : 'password',
				emptyText:"请输入密码",
				inputType : 'password',
				margin : "20 10 10 50"
			}, {
				xtype:"checkbox",
				name : 'remember',
				boxLabel : '记住密码',
				boxLabelAlign : 'after',
				margin : "10 0 0 75"
			}, {
				xtype:"checkbox",
				name : 'autologin',
				boxLabel : '自动登陆',
				boxLabelAlign : 'after',
				margin : "-18 0 0 165",
				listeners : {
					"change" : function(_this,_new,_old){
						if(_new){
							var remember = _this.up("loginwindow").down("checkbox[name=remember]");
							remember.setValue(true)
						}
					}
				}
			}]
		},{
			
			layout:'fit',
			bodyStyle: 'background:transparent',//设置为透明,不不妨碍更换主题了
			border:0,
			columnWidth:.28,
			items:[{
				xtype : "displayfield",
				hideLabel : true,
				margin : "0 0 0 0",
				value : "<img height=100 src='./images/loginlogo.gif' />"
			}]
		}]
	}],
	buttons:[{
		xtype : "button",
		text : '登录',
		ref:"login",
		width : 50
	}, {
		xtype : "button",
		text : '退出',
		width : 50,
		//margin : "10 10 10 20",
		handler : function(_btn) {
			var loginWin = _btn.up("loginwindow");
			Ext.Msg.confirm("提示","是否要退出系统",function(btn){
				if(btn == 'yes'){
					if(document.all){//IE
						window.open('', '_parent', '');
						window.close();
					}else{//FF
						window.open('', '_self', '');
						_btn.up("loginwindow").down("displayfield").setValue("<font color=red>提示：检测到当前是Firefox浏览器！请在址栏上输入about:config然后回车;搜索dom.allow_scripts_to_close_windows双击修改值为true再试此功能，这样才能关闭窗口</font>");
						window.close();
					}
				}
			},this);
		}
	}]
});
