function loadScripts() {
  XTemplateElement.prototype.registerEmitter('text/x-handlebars-template', function (context) {
      var source = this.innerHTML;
      var template = Handlebars.compile(source);
      return template(context);
  });
  
  
  var tag = new XTemplateElement();
  tag.innerHTML = '<div><h2 class="heading">{{heading}}</h2><div class="content">{{content}}</div></div>';
  tag.id = "template-test";
  tag.type = "text/x-handlebars-template";
  document.body.appendChild(tag);
  
  var statements = [
    {heading: 'Shouty statement', content: 'Going somewhere'},
    {heading: 'Appeasing hook', content: 'Disappointing ending'}
  ];

  var template = document.getElementById('template-test');
  statements.forEach(function (statement) {
    if (statement) {
         console.log(template, statement, template.emit(statement));
         document.body.appendChild(template.emit(statement));
    }
  });
}

window.onload = loadScripts;
