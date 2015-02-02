Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function() {
  	// {{ownPost}} will be true of the current user maps to the userId property we created
  	return this.userId === Meteor.userId();
  }
});