var reglists={'walmart':/"upc":"(\d{12})"/,'lowes':/"barcode":"(\d{12})"/,'belk':/UPC: (\d{13})/}//warmart跟target一样


function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr);
        }
    }
    xhr.send();
}


function sendHTML(reglists){
    var upc = false
    var title=false
    var url = document.documentElement.baseURI
    httpRequest(url,function(api){xhtml=api.responseText})
    for (var key in reglists){
        if(xhtml.match(reglists[key])){
            console.log(xhtml.match(reglists[key]))
            upc=xhtml.match(reglists[key])[1]
            if(title=xhtml.match(/<h1.*?>(.*?)</)){
                title=xhtml.match(/<h1.*?>(.*?)</)[1]
                if(title.length<3){
                    if(title=xhtml.match(/"Product","name":"(.*?)"/)){
                        title=xhtml.match(/"Product","name":"(.*?)"/)[1]
                    }//target title
                }
            }else{title=''}
            

 
        //    console.log(upc)
         //   console.log(title)
            break;
        }
        
        
    }
    return {upc:upc,title:title}

}

  chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
    //console.log(request);
    var resp=sendHTML(reglists);
    //console.log(resp);
    sendResponse(resp);
})