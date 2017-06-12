this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["dialog"] = this["Handlebars"]["templates"]["dialog"] || {};
this["Handlebars"]["templates"]["dialog"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-modal oui-dialog\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">\n		<div class=\"body\">\n			<p>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n		</div>\n		<div class=\"footer\">\n			<a href=\"\" class=\"ok-button\">"
    + alias3(((helper = (helper = helpers.okButtonText || (depth0 != null ? depth0.okButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"okButtonText","hash":{},"data":data}) : helper)))
    + "</a>\n			<a href=\"\" class=\"cancel-button\">"
    + alias3(((helper = (helper = helpers.cancelButtonText || (depth0 != null ? depth0.cancelButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cancelButtonText","hash":{},"data":data}) : helper)))
    + "</a>\n		</div>\n	</div>\n	<div class=\"oui-modal-underlay\"></div>\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["menu"] = this["Handlebars"]["templates"]["menu"] || {};
this["Handlebars"]["templates"]["menu"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-menu "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">\n		"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"oui-menu-underlay\"></div>\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["modal"] = this["Handlebars"]["templates"]["modal"] || {};
this["Handlebars"]["templates"]["modal"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-modal "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n	<div class=\"oui-modal-underlay\"></div>\n</div>";
},"useData":true});