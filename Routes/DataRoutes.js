import express from 'express';
import {google} from 'googleapis'
const router = express.Router();

router.get('/detail/:id',async(req,res)=>{
	const id=req.params.id;
	const auth =new google.auth.GoogleAuth({
		keyFile:"credential.json",
		scopes:"https://www.googleapis.com/auth/spreadsheets",
	})
	console.log(id)
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
	//this one  is used to write a data froma sheet
	// await googleSheeets.spreadsheets.values.append({
	// 	auth,
	// 	spreadsheetId,
	// 	range:"Sheet1!A:B",
	// 	valueInputOption:"USER_ENTERED",
	// 	insertDataOption: 'INSERT_ROWS',
    // 	resource: {
    //     "majorDimension": "ROWS",
    //     "values": [["Gokul","91762113206","pattukotai"]]
    // },
	
	// })
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
	
	for(let a=0;a<lengther;a++){
		
		if(getter[a].id == id ){
			
			return res.send(getter[a])
			
			break
		}
		
	}
	
})
router.get('/sent',async(req,res)=>{
	const auth =new google.auth.GoogleAuth({
		keyFile:"credential.json",
		scopes:"https://www.googleapis.com/auth/spreadsheets",
	})
	
	const client =await auth.getClient();
    const spreadsheetId="1_G1OZ85nm82SsxnBBvZD0l2F-3QoQ8_MvLrah3r6ahw";
	const googleSheeets =google.sheets({version:'v4',auth:client});
	const metaData=await googleSheeets.spreadsheets.get({
		auth,
		spreadsheetId,
		})
	const getRow=await googleSheeets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range:"Sheet2",
	})
	const dater=getRow.data.values;
	let getter=[];
	const lengther=getRow.data.values.length

	for(let a=1; a < lengther; a++){
  		var student1=dater[a];
  		for(let b=0 ; b < 3 ; b++){
    		getter.push({'id':a,'name':student1[b],'registrarId':student1[b+1],"mark":student1[b+2],
		'mark2':student1[b+3],'mark3':student1[b+4]})
		
		break;
  		}
	}
	res.send(getter)
})

router.post('/mark',async(req,res)=>{
	const spliter=req.body.mark;
	const marker=req.body.test;
	let string=spliter.toString();
	let a=string.split(',');
	let ranger,error=null;
	const auth =new google.auth.GoogleAuth({
		keyFile:"credential.json",
		scopes:"https://www.googleapis.com/auth/spreadsheets",
	})
	console.log(a)
	console.log(marker)
	const client =await auth.getClient();
    const spreadsheetId="1_G1OZ85nm82SsxnBBvZD0l2F-3QoQ8_MvLrah3r6ahw";
	const googleSheeets =google.sheets({version:'v4',auth:client});
	const metaData=await googleSheeets.spreadsheets.get({
		auth,
		spreadsheetId,
		})
		if(!!spliter){
	// this one is used to read a data from a sheet
	
	
	 
	}
	const getRow=await googleSheeets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range:"Sheet2",
	})
	const dater=getRow.data.values;
	let getter=[];
	const lengther=getRow.data.values.length

	for(let a=1; a < lengther; a++){
  		var student1=dater[a];
  		for(let b=0 ; b < 3 ; b++){
    		getter.push({'id':a,'name':student1[b],'registrarId':student1[b+1],"mark":student1[b+2],
		'mark2':student1[b+3],'mark3':student1[b+4]})
		
		break;
  		}
	}
	const waiter=getter[2];
	const changer=async (data)=>{
		console.log(data)
		await googleSheeets.spreadsheets.values.append({
			auth,
			spreadsheetId,
			range:`Sheet2!${data}`,
			valueInputOption:"USER_ENTERED",
			resource: {
			"majorDimension": "COLUMNS",
			"values": [a]
		},
		
		})
	}

	if(marker=='s1' && !(waiter.mark)){
		ranger='C:C'
		changer(ranger)
	}
	else if(marker=='s2' && !(waiter.mark2)){
		ranger="D:D";
		changer(ranger)
	}
	else if(marker=='s3' && !(waiter.mark3)){
		ranger="E:E";
		changer(ranger)
	}
	else{
		error="!! Sorry Mark Was Already entered"
		console.log(error)
	}
	
	res.send(error)
})


export{router as dataRouter}