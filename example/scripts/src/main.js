'use strict';

var fullWidthSlideshow = require('../../../index'),
	async = require('async'),
	webapp = require('./webapp');

var module1 = webapp,
	fullWidthSlideshow1 = false,
	fullWidthSlideshow2 = false;

window.onload = function(){
	async.parallel({
	    template: function(callback){
			module1.grabTemplate(window.document.getElementById('component-template').innerHTML,callback);
	    },
	    componentData: function(callback){
            module1.grabData('https://s3.amazonaws.com/gpsampledata/component.list-view-scroll/contentspec.json',callback);
	    }
	},
	function(err, results) {
		if(err){
			console.log(err);
		}
		webapp.render( results.template, results.componentData, "slider1");
		fullWidthSlideshow1 = new fullWidthSlideshow({element:"p_c_lvs-id"});

		var data2 = results.componentData;
		data2.contentspec.config.html.dom_id="p_c_lvs-id2";
		data2.contentspec.config.html.preview=true;
		webapp.render( results.template, data2, "slider2");
		fullWidthSlideshow2 = new fullWidthSlideshow({element:"p_c_lvs-id2"});
	});
};

module1.on("grabbedData",function(){
	console.log("loaded data");
});

module1.on("grabbedTemplate",function(){
	console.log("loaded template");
});

// listviewcroll1.on("renderedComponent",function(){
// 	listviewcroll1.init();
// 	console.log("rendered template");
// });

// listviewcroll2.on("renderedComponent",function(){
// 	listviewcroll2.init({idSelector: 'anotherScroller'});
// 	console.log("@(*#)@(# rendered template");
// });