this["OUI"] = this["OUI"] || {};
this["OUI"]["templates"] = this["OUI"]["templates"] || {};
this["OUI"]["templates"]["dialog"] = this["OUI"]["templates"]["dialog"] || {};
this["OUI"]["templates"]["dialog"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
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
this["OUI"]["templates"]["menu"] = this["OUI"]["templates"]["menu"] || {};
this["OUI"]["templates"]["menu"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-menu "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">\n		"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"oui-menu-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["modal"] = this["OUI"]["templates"]["modal"] || {};
this["OUI"]["templates"]["modal"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-modal "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n	<div class=\"oui-modal-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["pagination"] = this["OUI"]["templates"]["pagination"] || {};
this["OUI"]["templates"]["pagination"]["hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div>\n	<b>"
    + alias3(((helper = (helper = helpers.showingFrom || (depth0 != null ? depth0.showingFrom : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"showingFrom","hash":{},"data":data}) : helper)))
    + "-"
    + alias3(((helper = (helper = helpers.showingTo || (depth0 != null ? depth0.showingTo : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"showingTo","hash":{},"data":data}) : helper)))
    + "</b> of <b>"
    + alias3(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"total","hash":{},"data":data}) : helper)))
    + "</b>\n</div>\n<a \n	href=\""
    + alias3(((helper = (helper = helpers.prevPageLink || (depth0 != null ? depth0.prevPageLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"prevPageLink","hash":{},"data":data}) : helper)))
    + "\" \n	class=\"button paginate "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.hasPrevPage : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" \n	data-o-link data-prev>\n	<i class=\"icon-left-open\"></i>\n</a>\n<a \n	href=\""
    + alias3(((helper = (helper = helpers.nextPageLink || (depth0 != null ? depth0.nextPageLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nextPageLink","hash":{},"data":data}) : helper)))
    + "\" \n	class=\"button paginate "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.hasNextPage : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" \n	data-o-link data-next>\n	<i class=\"icon-right-open\"></i>\n</a>";
},"useData":true});
this["OUI"]["templates"]["search-form"] = this["OUI"]["templates"]["search-form"] || {};
this["OUI"]["templates"]["search-form"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<form class=\"search-form\">\n	<input type=\"text\" name=\"q\" placeholder=\""
    + this.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n\n	<button type=\"button\" class=\"tcon tcon-search--xcross\" aria-label=\"toggle search\">\n	  	<span class=\"tcon-search__item\" aria-hidden=\"true\"></span>\n	  	<span class=\"tcon-visuallyhidden\">toggle search</span>\n	</button>\n</form>";
},"useData":true});
this["OUI"]["templates"]["toast"] = this["OUI"]["templates"]["toast"] || {};
this["OUI"]["templates"]["toast"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-toast\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<p>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n	<a href=\"\" data-oui-dismiss class=\"icon-cancel\"></a>\n</div>";
},"useData":true});