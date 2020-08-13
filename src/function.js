import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

export function getProduit(id){
    return new Promise((resolve,reject)=>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }else if(this.readyState == XMLHttpRequest.DONE && this.status != 200 ){
                reject(this.responseText);
            }
        };
        request.open("GET",API_URL+'/'+id);
        request.send();
    });
}