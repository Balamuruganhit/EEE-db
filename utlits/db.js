import mysql from "mysql"

const con=mysql.createConnection({
	host:"blyj6jzurqqrwnonltok-mysql.services.clever-cloud.com",
	user:"ujgdy4u68khtrhti",
	password:"JpKDaTYkh4RUAyXxRjo2",
	database:"blyj6jzurqqrwnonltok"
})

con.connect(function(err){
	if(err){
		console.log("connection error")
	}
	else{
		console.log("connected")
	}
})

export default con;