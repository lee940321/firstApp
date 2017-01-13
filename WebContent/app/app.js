Ext.application({ 
	name: 'app', 
	
	controllers: [
      'MainController'
    ],
	
	splashscreen: {},
	
	init: function() {
		splashscreen = Ext.getBody().mask('欢迎进入','splashscreen');
		splashscreen.addCls('splashscreen');
		Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
    		cls: 'x-splash-icon'
    	});
	},
	

   launch: function() { 
    	
    	Ext.tip.QuickTipManager.init();

        var task = new Ext.util.DelayedTask(function() {

            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });

           
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts ){
                        Ext.create("Ext.container.Viewport",{
                        	                       	
							layout : "fit",
							border : 0,
							items : [{
								xtype : "mainviewlayout"
							}]
						});
						
						/**显示登陆窗口*/
					    var loginWin =Ext.create("app.view.LoginWindow");
					    loginWin.show();
                    }
                  
                }
            });

           
       });

       task.delay(2000);

    }
});