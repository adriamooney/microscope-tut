Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: e.target.url.value,
			title: e.target.title.value
		};


		Meteor.call('postInsert', post, function(error, result) {

			if(error)
				return alert(error.reason);

			if(result.postExists) //postExists is returned if postWithSameLink is true
				alert('this link has already been posted');

			Router.go('postPage', {_id: result._id}); //goes to the page which matches the existing url, by finding it's id (_id: postWithSameLink._id)
		});

		//post._id = Posts.insert(post);  //move this to thte method 
		
	}
});