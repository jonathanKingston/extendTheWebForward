let XTemplateProto = Object.create(HTMLTemplateElement.prototype);
XTemplateProto.emit = function (context) {
  let node = this.emitElement(context);
  return node;
};

function emitOutput(context) {
  let source = this.innerHTML;
  if (this.type in this.emitters) {
    return this.emitters[this.type].call(this, context);
  }
  return source;
};

XTemplateProto.emitElement = function (context) {
  let dummyNode = document.createElement('div');
  let fragment = document.createDocumentFragment();
  dummyNode.innerHTML = emitOutput.call(this, context);
  if (dummyNode.children.length) {
    for (let i = 0; i < dummyNode.children.length; i++) {
      fragment.appendChild(document.importNode(dummyNode.children[i], true));
    }
  }
  return fragment;
};

Object.defineProperty(XTemplateProto, 'type', { 
  value: 'text/x-handlebars-template',
  writable: true
});

Object.defineProperty(XTemplateProto, 'emitters', { 
  value: {},
  writable: false
});

XTemplateProto.registerEmitter = function (type, callback) {
  this.emitters[type] = callback;
};

window.XTemplateElement = document.registerElement('x-template', {
  prototype: XTemplateProto,
  extends: 'template'
});

