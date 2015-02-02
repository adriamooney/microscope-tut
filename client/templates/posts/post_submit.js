
//what's the difference beteen Template.created and Template.rendered?
Template.postSubmit.created = function() {
	Session.set('postSubmitErrors', {});
}
Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: e.target.url.value,
			title: e.target.title.value
		};

		//client side validation.  we can also use this function on the server
		// see lib/collections/posts.js
		var errors = validatePost(post);
		if(errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result) {

			if(error)
				return throwError(error.reason);

			if(result.postExists) //postExists is returned if postWithSameLink is true
				throwError('This link has already been posted');

			Router.go('postPage', {_id: result._id}); //goes to the page which matches the existing url, by finding it's id (_id: postWithSameLink._id)
		});

		//post._id = Posts.insert(post);  //move this to thte method 
		
	}
});

