this["OUI"] = this["OUI"] || {};
this["OUI"]["templates"] = this["OUI"]["templates"] || {};
this["OUI"]["templates"]["dialog"] = this["OUI"]["templates"]["dialog"] || {};
this["OUI"]["templates"]["dialog"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-modal oui-dialog\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"1\">\n	<div class=\"wrapper\">\n		<div class=\"body\">\n			<p>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n		</div>\n		<div class=\"footer\">\n			<a href=\"\" class=\"ok-button\">"
    + alias3(((helper = (helper = helpers.okButtonText || (depth0 != null ? depth0.okButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"okButtonText","hash":{},"data":data}) : helper)))
    + "</a>\n			<a href=\"\" class=\"cancel-button\">"
    + alias3(((helper = (helper = helpers.cancelButtonText || (depth0 != null ? depth0.cancelButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cancelButtonText","hash":{},"data":data}) : helper)))
    + "</a>\n		</div>\n	</div>\n	<div class=\"oui-modal-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["hover-menu"] = this["OUI"]["templates"]["hover-menu"] || {};
this["OUI"]["templates"]["hover-menu"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-hover-menu "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"wrapper\">\n		"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"oui-hover-menu-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["menu"] = this["OUI"]["templates"]["menu"] || {};
this["OUI"]["templates"]["menu"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-menu "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"1\">\n	<div class=\"wrapper\">\n		"
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
    + "\" tabindex=\"1\">\n	<div class=\"wrapper\">"
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
    + "\" \n	data-prev>\n	<i class=\"icon-left-open\"></i>\n</a>\n<a \n	href=\""
    + alias3(((helper = (helper = helpers.nextPageLink || (depth0 != null ? depth0.nextPageLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nextPageLink","hash":{},"data":data}) : helper)))
    + "\" \n	class=\"button paginate "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.hasNextPage : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" \n	data-next>\n	<i class=\"icon-right-open\"></i>\n</a>";
},"useData":true});
this["OUI"]["templates"]["search-form"] = this["OUI"]["templates"]["search-form"] || {};
this["OUI"]["templates"]["search-form"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form class=\"search-form\">\n	<input type=\"text\" name=\""
    + alias3(((helper = (helper = helpers.param || (depth0 != null ? depth0.param : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"param","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias3(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" class=\"search-input\">\n	<i class=\"toggle-button icon-search\"></i>\n</form>";
},"useData":true});
this["OUI"]["templates"]["toast"] = this["OUI"]["templates"]["toast"] || {};
this["OUI"]["templates"]["toast"]["hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "		<a href=\"\" class=\"cta-link\">"
    + this.escapeExpression(((helper = (helper = helpers.cta || (depth0 != null ? depth0.cta : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"cta","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-toast\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div>\n		<p>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cta : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["toggle-menu"] = this["OUI"]["templates"]["toggle-menu"] || {};
this["OUI"]["templates"]["toggle-menu"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-toggle-menu hidden "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"1\">\n	<div class=\"wrapper\">\n		"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"oui-toggle-menu-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["tour-tip"] = this["OUI"]["templates"]["tour-tip"] || {};
this["OUI"]["templates"]["tour-tip"]["hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"oui-tour-tip "
    + alias3(((helper = (helper = helpers.extraClass || (depth0 != null ? depth0.extraClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"extraClass","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"1\">\n	<div class=\"wrapper\">\n		"
    + ((stack1 = ((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contents","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n	<div class=\"oui-tour-tip-underlay\"></div>\n</div>";
},"useData":true});
this["OUI"]["templates"]["video"] = this["OUI"]["templates"]["video"] || {};
this["OUI"]["templates"]["video"]["hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "	<video controls "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.autoRepeat : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " class=\"hidden\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sources : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</video>\n";
},"2":function(depth0,helpers,partials,data) {
    return "loop";
},"4":function(depth0,helpers,partials,data) {
    return "		<source src=\""
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "\"></source>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return "		style=\"background: \n			linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), \n				url("
    + this.escapeExpression(((helper = (helper = helpers.preview || (depth0 != null ? depth0.preview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"preview","hash":{},"data":data}) : helper)))
    + ") no-repeat center/contain;  \n	    	background-color: #001f2d;\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"video-container\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sources : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n	<div class=\"video-spinner\"></div>\n	<div class=\"video-error hidden\"><span>Unable to play video</span></div>\n\n	<div \n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.preview : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		class=\"video-preview hidden\">\n			<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 72\"><path opacity=\".8\" fill=\"#1DA1F2\" d=\"M30 12C16.768 12 6 22.765 6 36s10.766 23.998 24 23.998 24-10.765 24-24S43.235 12 30 12z\"/><path fill=\"#FFF\" d=\"M39.2 34.34l-12-9c-.606-.455-1.418-.528-2.094-.19-.677.34-1.106 1.032-1.106 1.79v18c0 .758.428 1.45 1.106 1.79.283.14.59.21.894.21.425 0 .847-.136 1.2-.4l12-9c.503-.377.8-.97.8-1.6 0-.63-.295-1.223-.8-1.6z\"/><path fill=\"#FFF\" d=\"M30 15c11.598 0 21 9.402 21 21s-9.4 20.998-21 20.998-21-9.402-21-21S18.4 15 30 15m0-6C15.112 9 3 21.11 3 36s12.112 26.998 27 26.998 27-12.11 27-27S44.888 9 30 9z\"/></svg>\n	</div>	\n</div>";
},"useData":true});