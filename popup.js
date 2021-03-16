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


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      document.getElementById('r').innerHTML='loading';
        if (!response||typeof(response.upc)=='undefined'){
            document.getElementById('go').disabled=true;
            document.getElementById('gotitle').disabled=true
            
        }
        if(typeof(response.upc)=='undefined'){
          document.getElementById('go').disabled=true;
          document.getElementById('gotitle').disabled=true
            response.upc='loading'
            response.title='再点击一次'

        }
        

      document.getElementById('r').innerHTML='UPC:'+response.upc;
      document.getElementById('title').innerHTML=response.title;
      document.getElementById('go').disabled=false;
  //     httpRequest('https://www.amazon.com/s?k='+response.upc, function(api){
  // xhtml=api.responseText;
//   console.log(xhtml.match(/\d{12}的搜索结果/))
//   console.log(xhtml.match(/No results for /)==null||xhtml.match(/\d{12}的搜索结果/)==null)

//   if(xhtml.match(/No results for /)==null||xhtml.match(/\d{12}的搜索结果/)==null){
// console.log(1)
//   document.getElementById('hasupc').innerHTML='有商品'
// }else{  
//   console.log(2)
//   document.getElementById('hasupc').innerHTML='无商品，请用下方标题搜索'
// }})
        console.log(response.title.replace("&#39;", "'"))
      document.getElementById('go').onclick=()=>{


        window.open('https://www.amazon.com/s?k='+response.upc)
      }
      document.getElementById('gotitle').onclick=()=>{

        window.open("https://www.amazon.com/s?k="+response.title.replace("&#39;", "'"))
      } 
    }
         
      
    );
  });

