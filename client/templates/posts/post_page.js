Template.postPage.helpers({
	comments: function() {
		//this is a post within the comments helper. To find the relevant comments,
		// we check those that are linked to that post via the postId attribute.
		return Comments.find({postId: this._id});
	}
})