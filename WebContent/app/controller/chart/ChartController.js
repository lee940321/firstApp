Ext.define("app.controller.chart.ChartController", {
	extend : "Ext.app.Controller",
	
	init : function() {
		var self = this;
		this.control({
			"chartlayout menu#changeType menuitem": {
               click: this.onChangeChart
            },
            "chartlayout menu#download menuitem": {
                click: this.onChartDownload
            }
            
		});
	},
	
	onChangeChart: function(item, e, options) {
        var panel = item.up('chartlayout');

        if (item.itemId == 'pie'){
            panel.getLayout().setActiveItem(0);
            
        } else if (item.itemId == 'column'){
            panel.getLayout().setActiveItem(1);
           
        } else if (item.itemId == 'bar'){
            panel.getLayout().setActiveItem(2);
        }
    },
    
    
     onChartDownload: function(item, e, options) {
        var chart = item.up('chartlayout').getLayout().getActiveItem();

        if (item.itemId == 'svg'){
            Ext.MessageBox.confirm('提示', '您是否要下载该图片', function(choice){
                if(choice == 'yes'){
                    var mySave = function(surface, config) {
                        config = config || {};
                        var exportTypes = {
                                'image/png': 'Image',
                                'image/jpeg': 'Image',
                                'image/svg+xml': 'Svg'
                        },
                        prefix = exportTypes[config.type] || 'Svg',
                        exporter = Ext.draw.engine[prefix + 'Exporter'];          
                        exporter.defaultUrl = '/jtcw/center/svg.action';
                    	return exporter.generate(surface, config);
                	};
                    
                	mySave(chart.surface,{
                    	type: 'image/jpeg'
                	});

        		}
                	
            });
        } 
    },
	
	views : [
	    "app.view.chart.ChartLayout",
	    "app.view.chart.ChartPie",
	    "app.view.chart.ChartColumn",
	    "app.view.chart.ChartBar"
	],
	stores : ["app.store.chart.ChartStore"],
	models : ["app.model.chart.ChartModel"]
	
});