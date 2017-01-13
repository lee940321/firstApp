Ext.define('app.view.chart.ChartColumn', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartcolumn',

    animate: true,
    store: 'app.store.chart.ChartStore',
    shadow: true,
    insetPadding: 60,
    theme: 'Base:gradients',
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['sum'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '金额',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['type'],
        title: '交易类型'
    }],
    series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('type') + ': ' + storeItem.get('sum') + ' $');
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: 'total_sales',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'type',
        yField: 'sum'
  }]
});