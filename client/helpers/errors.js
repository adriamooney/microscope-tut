// Local (client-only) collection
//MongoDB collection name set to null 
//(since this collection's data will never be saved into the server-side database):
Errors = new Mongo.Collection(null);

//why do we use global variable here?
throwError = function(message) {
	Errors.insert({message: message});
};