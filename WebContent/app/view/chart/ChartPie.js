Ext.define('app.view.chart.ChartPie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartpie',

    animate: true,
    store: 'app.store.chart.ChartStore',
    shadow: true,
    legend: {
        position: 'right'   //图例位置
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',   //图例类型
        field: 'sum',   //对应饼状图角度的字段名
        showInLegend: true,      //是否显示在图例当中
        tips: {
              trackMouse: true,   //快速提示信息
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('type') + ': ' + storeItem.get('sum'));
              }
        },
        highlight: {
          segment: {
            margin: 20
          }
        },
        label: {
            field: 'type',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});