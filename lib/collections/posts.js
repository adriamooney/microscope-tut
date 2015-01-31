//In Meteor, the var keyword limits the scope of an object to the current file. 
//Here, we want to make the Posts collection available to our whole app, 
//which is why we're not using the var keyword.

Posts = new Mongo.Collection('posts');

Meteor.methods({

	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});


		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink) {
			return {  //if the url is a duplicate, the method returns here so doesn't do the insert, 'thus elegantly preventing duplicates'
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		var postId = Posts.insert(post);
		return {
			_id: postId  //why are we doing this? 
		};
	}
})

