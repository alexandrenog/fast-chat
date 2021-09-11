const fs = require("fs");

const http = require("http");
const https = require("https");
const logger = require("morgan");
const express = require("express");
const app = express();
let credentials, server;
let secure = false;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fast-chat');

//db.chats.update(
//	{ _id: ObjectId("613a7157b5975329b5460b89") },
//	{ $push: { messages: { id: 1, content: "adsasddnnnsa", author: "unkown" } }}
// )


try {
	const privateKey = fs.readFileSync("privkey.pem", "utf8");
	const certificate = fs.readFileSync("cert.pem", "utf8");
	const ca = fs.readFileSync("chain.pem", "utf8");
	credentials = { key: privateKey, cert: certificate, ca: ca };
	secure = true;
} catch (e) {}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (secure) {
	server = https.createServer(credentials, app);
} else {
	server = http.createServer(app);
}

app.use((req, res, next) => {
	if (!req.secure && secure) {
		console.log("Redirecting Insecure Request");
		res.redirect("https://" + req.headers.host + req.url);
	} else {
		next();
	}
});

app.use(express.static("dist"));

// Create API URLs Here
const chatSchema =  new mongoose.Schema({
    messages: [{id: Number, content: String, author: String}],
    key: String
  },{ collection: 'chats' });

app.post("/api/postMessage/:key", async (req, res) => {
	console.log(req.body);
	Chats = mongoose.model('chats',chatSchema, 'chats');
	const filter = { key: req.params.key };
	const update = {
		$push: { messages: req.body}
	};
	await Chats.findOneAndUpdate(filter, update);
	
});

app.get("/api/getChat/:key", async (req, res) => {
	Chats = mongoose.model('chats',chatSchema, 'chats');
	Chats.countDocuments({key: req.params.key}, async function (err, count){ 
		if(count>0){
			chat = await Chats.find({key: req.params.key}).lean();
			console.log(chat);
			res.json(chat);
		}
		else{
			await Chats.create({messages: [], key: req.params.key})
			chat = await Chats.find({key: req.params.key}).lean();
			console.log(chat);
			res.json(chat);
		}
	}); 

});


let port;

if (secure) {
	port = 8443;
	server.listen(port, () => console.log("HTTPS Server Running on Port " + port));
} else {
	port = 8080;
	server.listen(port, () => console.log("HTTP Server Running on Port " + port));
}
