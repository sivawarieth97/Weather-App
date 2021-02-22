const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const request=require('request');
const bodyparser=require('body-parser');
const { json } = require('body-parser');
//const request  = require('express');
app.set('view engine','ejs');
app.set('views','view');
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static( "public" ) );
app.get('/',(req,res)=>{
    res.render('index' , {w : null ,desc:null,  e:null , icon:null });
});
const key=`b721a66fa35e39d550d3bb6dfdca4fa9`;
app.post('/',(req,res)=>{
    const city=req.body.city;
    console.log(city);
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

   // var abc=  url.parse(urll,true);
    //console.log(abc);
    request(url , (err,resp,body)=>{
      if(err) {res.render('index', {w: null, e:err});}
        else {
            let we=JSON.parse(body);
            if(we.main==undefined){ res.render('index', {w: null,desc:null, e:'Please try again later',icon:null});
        
        }
            else  {console.log(we.weather[0].icon);
                
                let t=Math.round((we.main.temp-32)* (5/9));
                let abc=`Its ${t} degrees in ${city}`;
                let d=we.weather[0].description;
                let iconid=we.weather[0].icon;
                let iconurl=`http://openweathermap.org/img/wn/${iconid}@2x.png`
                res.render('index',{w:abc ,desc:d ,  e: null ,icon:iconurl})}

        }
    });
    


})
app.use((req,res)=>{
    res.status(404).render('404');
});
app.listen(3000);