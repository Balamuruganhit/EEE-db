import express from 'express'
import con from '../utlits/db.js'
import jwt from 'jsonwebtoken'
import bcrpt from 'bcrypt'
import {google} from 'googleapis'

const router = express.Router();

router.post('/adminlogin',(req,res)=>{
	const sql="SELECT * from  member Where number = ? and password = ? and designation = ?" 
	con.query(sql,[req.body.number, req.body.password ,req.body.designation], (err, result) =>{
		if(err) return res.json({loginStatus: false, Error: "Query error"});
		if(result.length > 0){
			
			const number =result[0].number;
			const token = jwt.sign({role:"member",number: number},"jwt_secret_key",{expiresIn:'1d'}
			);
			res.cookie('token',token)
			console.log(result)
			return  res.json({loginStatus: true,Result:result});

		}else{
			return res.json({loginStatus: false, Error: "Wrong Password And ID"})
		}
	})
})

router.get('/student',async (req,res) =>{
	const auth =new google.auth.GoogleAuth({
		keyFile:"credential.json",
		scopes:"https://www.googleapis.com/auth/spreadsheets",
	})

	const client =await auth.getClient();
    const spreadsheetId="12pdDfdQoRu-SWlAHjNuzxakOj011SetRpJif-C0NV7M";
	const googleSheeets =google.sheets({version:'v4',auth:client});
	const metaData=await googleSheeets.spreadsheets.get({
		auth,
		spreadsheetId,
		})
	// this one is used to read a data from a sheet
	const getRow=await googleSheeets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range:"Sheet1",
	})
	const dater=getRow.data.values;
	let getter=[];
	const lengther=getRow.data.values.length

	for(let a=1; a < lengther; a++){
  		var student1=dater[a];
  		for(let b=0 ; b < 3 ; b++){
    		getter.push({'id':a,'name':student1[b],'registrarId':student1[b+1],
		'Gender':student1[b+2],'DOB':student1[b+3],'age':student1[b+4],
		'phoneno':student1[b+5],'whatsapp':student1[b+6],'email':student1[b+7],
	'blood':student1[b+8],'aadhar':student1[b+9],'address':student1[b+10],'father':student1[b+11],'occupation':student1[b+12]
	,'mother':student1[b+13],'moccupation':student1[b+14],'income':student1[b+15]
	,'fphone':student1[b+16],'regligion':student1[b+18],'community':student1[b+19],'caste':student1[b+20],
	'tongue':student1[b+21],'hostel':student1[b+22],'hName':student1[b+23],'room':student1[b+24],'photo':student1[b+28]})
		break;
  		}
	}
	return res.send(getter)
})

router.get('/logout',(req,res)=>{
	res.clearCookie('token')
	return res.json({status:true})
})



export{router as employeesRouter}
