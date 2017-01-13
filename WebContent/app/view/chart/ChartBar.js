Ext.define('app.view.chart.ChartBar', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartbar',

    animate: true,
    store: 'app.store.chart.ChartStore',
    shadow: true,
    insetPadding: 60,
    theme: 'Base:gradients',
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['sum'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '金额',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['type'],
        title: '交易类型'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item, attr) {
            this.setTitle(storeItem.get('type') + ': ' + storeItem.get('sum') + ' $');
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: '金额',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            contrast: true
        },
        xField: 'type',
        yField: 'sum'
  }]
});