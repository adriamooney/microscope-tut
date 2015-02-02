Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		console.log(this);
		//this refers to the current post
		var currentPostId = this._id;

		var postProperties = {
			url : e.target.url.value,
			title: e.target.title.value
		}

		//this update could be moved to a method and called here instead
		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if(error) {
				alert(error.reason);
			}
			else {
				Router.go('postPage', {_id: currentPostId});
			}
		}); 
		//why does this show a 500 error even though it works?
		Meteor.call('editPost', currentPostId, postProperties);
	},
	'click .delete': function(e) {
	    e.preventDefault();

	    if (confirm("Delete this post?")) {
	      var currentPostId = this._id;
	      //this remove could be moved to a method and called here instead
	      Posts.remove(currentPostId);
	     // Meteor.call('deletePost', currentPostId);
	      Router.go('postsList');
	    }
  }
})