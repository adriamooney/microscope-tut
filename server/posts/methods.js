Meteor.methods({
'deletePost': function(post) {
        Posts.remove(post);
},
'editPost': function(post, postProperties) {
	Posts.update(post, {$set: postProperties}, function(error) {

		if(error) {
				alert(error.reason);
		}
			else {
				Router.go('postPage', {_id: post});
		}
	}); 
}


});


