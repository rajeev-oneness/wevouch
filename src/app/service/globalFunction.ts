export function isNumberKey(event : any) : any {
    console.log(event);
    if(event.charCode >= 48 && event.charCode <= 57){
        return true;
    }
    return false;
}

export function getDateFormat(date : any) : any {
    let dt = new Date(date);
    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");
    return year + '-' + month + '-' + day;
}

export function getTimeFormat(time : any) : any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
}

export function EncodeDecodeBase64(value : any,changeTo:string){
    if(changeTo == 'encode'){
        return btoa(value);
    }else{
        return atob(value);
    }
}

export function dateDiffInDays(date1:any, date2:any) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((date1 - date2) / _MS_PER_DAY);
}

export function htmlToCSV(html: any, filename: any) {
    var data = [];
    var rows = document.querySelectorAll("table tr");
        
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
          
      for (var j = 1; j < cols.length-1; j++) {
              row.push((<HTMLElement>cols[j]).innerText);
          }
              
      data.push(row.join(",")); 		
    }
  
    downloadCSVFile(data.join("\n"), filename);
  }

export function downloadCSVFile(csv:any, filename:any) {
    var csv_file, download_link;
  
    csv_file = new Blob([csv], {type: "text/csv"});
  
    download_link = document.createElement("a");
  
    download_link.download = filename;
  
    download_link.href = window.URL.createObjectURL(csv_file);
  
    download_link.style.display = "none";
  
    document.body.appendChild(download_link);
  
    download_link.click();
}

//var csv is the CSV file with headers
export function csvJSON(csv: any){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers : any=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj :any;
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}