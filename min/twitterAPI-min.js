var express=require("express"),Twitter=require("twitter"),bodyParser=require("body-parser"),config=require("./config"),app=express(),router=express.Router(),parseJson=bodyParser(),twitter=new Twitter({consumer_key:process.env.TWITTER_CONSUMER_KEY,consumer_secret:process.env.TWITTER_CONSUMER_SECRET,access_token_key:process.env.TWITTER_ACCESS_TOKEN_KEY,access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET}),collectedTweets=[],keyword="";router.post("/",parseJson,function(e,o){console.log(e.body.query),keyword=e.body.query,twitter.stream("statuses/filter",{language:"en",track:keyword},function(e){e.on("data",function(e){console.log("collecting data"),collectedTweets.push(e)}),e.on("error",function(e){throw console.log(e),e}),setTimeout(function(){e.destroy(),console.log("collected "+collectedTweets.length+" tweets"),o.send(collectedTweets)},1e4)})}),module.exports=router;