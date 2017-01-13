Ext.override(Ext.form.field.Base,{
    
    fieldSubTpl: [ 
        '<input id="{id}" type="{type}" {inputAttrTpl}',
            ' size="1"', 
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="value"> value="{value}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}<tpl if="readOnly">;background:#E6E6E6;</tpl>"</tpl>',
        ' class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"/>',
        {
            disableFormats: true
        }
    ]    
})