 Ext.define("app.store.mem.SexStore",{
 	extend:'Ext.data.Store',
 	fields: ['sexId', 'sexName'],
    data: [
    {"sexId":"男","sexName":"男"},
    {"sexId":"女","sexName":"女"}
    ]
 });