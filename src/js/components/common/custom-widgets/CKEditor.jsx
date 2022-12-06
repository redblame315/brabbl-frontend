'use strict';
import forms from '../newforms/newforms';

var object = require('isomorph/object')
var React = require('react')
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

var Widget = forms.Widget

var CKEditorWidget = Widget.extend({
  constructor: function CKEditor(kwargs) {
    if (!(this instanceof CKEditor)) { return new CKEditor(kwargs) }
    // Ensure we have something in attrs
    kwargs = object.extend({attrs: null}, kwargs)
    // Provide default 'cols' and 'rows' attributes
    kwargs.attrs = object.extend({rows: '3', cols: '40'}, kwargs.attrs)
    Widget.call(this, kwargs)
  }
})

CKEditorWidget.prototype.render = function(name, value, kwargs) {
  kwargs = object.extend({}, kwargs)
  if (value === null) {
    value = ''
  }
  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name})
  var valueAttr = 'data'
  finalAttrs[valueAttr] = value
  //return React.createElement('textarea', finalAttrs)
  return  <CKEditor
        editor={ ClassicEditor }
        config={{
            title: false
        }}
        onReady={ editor => {
            editor.removeAttr("title");
            // You can store the "editor" and use when it is needed.
        } }
        {...finalAttrs}
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            const e = {
                target: {
                    name: finalAttrs.name,
                    description: finalAttrs.description,
                    getAttribute: (name) => {
                        return null
                    },
                    value: data
                },
            }
            finalAttrs.onChange(e)

        } }
        onBlur={ ( event, editor ) => {
        } }
        onFocus={ ( event, editor ) => {
        } }
   
    />
}

export default CKEditorWidget
