const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
	origin: true
});
admin.initializeApp();

/*
	Get the profile of the person who is currently logged in
*/


//firebase deploy --only functions:addMessage

exports.getProfile = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		res.send("hello from firebase");
	});
	console.log(req.query.uid);
	const promise =admin.firestore().doc('users/'+req.query.uid ).get();
	const p2  = promise.then(snapshot => {
		const data = snapshot.data();
		console.log(data);
		res.send(data);
	});
});

/* 
	Get the course information for a certian course
*/

exports.getCourseInformation = functions.https.onRequest((request, response) => {
	const promise =admin.firestore().doc('courses/001967').get();
	const p2  = promise.then(snapshot => {
		const data = snapshot.data();
		response.send(data);
	});
	p2.catch(error => {
		console.log(error);
		response.status(500).send(error);
	});
});
/*
	Get all the courses 
*/
/*
exports.getAllCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('courses').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
*/

/*
exports.getCoursesBySubject = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('courses').where('SUBJECT', '==', 'CS').get();
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			const data = doc.data();
			courses.push(data);
		});
		response.send(courses);
});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});

*/

exports.getAICourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('ArtificialIntelligenceCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getBusinessAnalysisSystemsAnalysisCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('BusinessAnalysisSystemsAnalysisCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getBusinessIntelligenceCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('BusinessIntelligenceCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getDataScienceCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('DataScienceCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getDatabaseAdminstrationCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('DatabaseAdminstrationCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});

		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getDatabaseSystemsCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('DatabaseSystemsCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getGameAndRealTimeSystemsCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('GameAndRealTimeSystemsCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});

exports.getHumanComputerInteractionCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('HumanComputerInteractionsCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getITEnterpriseManagementCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('ITEnterpriseManagementCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getStandardCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('StandardCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getSoftwareEngineeringCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('SoftwareEngineeringCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});
exports.getSoftwareAndSystemsDevelopmentCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('SoftwareAndSystemsDevelopmentCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});

exports.getTheoryCourses = functions.https.onRequest((request, response) => {
	var courses  = [];
	const promise = admin.firestore().collection('TheoryCR').get();
	console.log(promise);
	const p2 = promise.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
				const data = doc.data();
				courses.push(data);
				
		});
		response.send(courses);
	});
	p2.catch(error =>{
			console.log(error);
			response.status(500).send(error);
		});

});

