

function endtime(endtime){
	var thistime=Math.round(new Date().getTime()/1000);  
		var sytime=endtime-thistime; 
		var data={};
		if(sytime<0){
			data['type']=false;
		}else{ 
			data['type']=true;
			 var day=parseInt(sytime/86400); 
			 var h=parseInt(sytime%86400/3600); 
			 var m=parseInt(sytime%86400%3600/60); 
			 var s=sytime%86400%3600%60; 
			data['day']=day;
			data['h']=h>=10?h:'0'+h;
			data['m']=m>=10?m:'0'+m;
			data['s']=s>=10?s:'0'+s;     
		}
	return data	
}


export default {
	async endtime(){
		return endtime();
	}
}