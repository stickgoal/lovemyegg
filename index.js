const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//=========▽中间件▽=========
//使用post请求解码
app.use(urlencodedParser);

app.use(function(req,res,next){
	// console.log("跨域访问中间件")
	//设置response编码为utf-8
	res.header('Content-Type','text/html;charset=utf-8');

	res.header('Access-Control-Allow-Origin', '*');
  	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  	if (req.method === 'OPTIONS') {
   	 res.send(200)
	}else{
	 next()
	}
})


app.use(function (req,res,next) {
	var params ;
	
	if(req.method=='GET'){
		params = JSON.stringify(req.query);
	}else{

		params = JSON.stringify(req.body);
	}
	console.log(req.path+" "+params);
	next();
	
	console.log(req.path+" 结束响应==> "+ res.statusCode + " "+JSON.stringify(res.output));

})

app.use('/',express.static("public",{index:'index.html'}))

//=========△中间件△=========


app.post('/login',urlencodedParser, (req, res) => {
	
	var response;
	if("lucas"===req.body.username){
		response = {success:true}
	}else{
		response = {success:false,msg:'用户名不存在'}
	}

	res.end(JSON.stringify(response))

});

app.post('/keep',(req,res)=>{
	var response = {success:true}
	res.json(response);
});




app.get("/getTags",(req,res)=>{

	var response = {
		success:true,
		paymentTags:['餐饮','交通','知识'],
		gainTags:['工资','兼职','礼物']
	}
	res.end(JSON.stringify(response))
});

app.listen(port, () => console.log(`服务启动 监听:::> ${port}!`))