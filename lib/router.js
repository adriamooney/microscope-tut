Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  //wait for the data to be rendered before showing the layout
  waitOn: function() { 
  	return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
	}
  //told the router to use the layout template layout.html as the default layout for all routes
});

Router.route('/', {name: 'postsList'}); //postsList is the name of the template to render in the yield helper inside layout.html
Router.route('/posts/:_id', {
	name: 'postPage',
	//data context, tell the template what data to put in there
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() {return Posts.findOne(this.params._id); }
})

//Within the data function for a route, `this` corresponds to the currently matched route, 
//and we can use this.params to access the named parts of the route (which we indicated by 
//prefixing them with : inside our path).

Router.route('/submit', {name: 'postSubmit'});


//require login to see post submit template.
//show loading template until log in is complete, to make sure to 
//show the correct template
var requireLogin = function() {
	if(! Meteor.user()) {
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		}
		else {
			this.render('accessDenied');
		}
	} else {
		this.next(); //this is iron router language
	}
}



//This tells Iron Router to show the “not found” page not just for invalid routes 
//but also for the postPage route, whenever 
//the data function returns a “falsy” (i.e. null, false, undefined, or empty) object.
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

