let nome=prompt("Qual seu lindo nome?")
let usuario = {
    name: nome,
};
let mensagens=[];
login();
function login() {    
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    requisicao.then(obterMensagens);
}
function refreshMensagens(){
    setInterval(obterMensagens,3000);
}
function obterMensagens() {  
    const promess = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promess.then(processarResposta);
    promess.catch(tratarErro);
    } 
function processarResposta(resposta) {   
    mensagens=resposta.data;
    console.log(mensagens);
   let ulmensagens=document.querySelector(".mensagens");
   ulmensagens.innerHTML=""
   for (let i=0;i<mensagens.length;i++){ 
   if (mensagens[i].type==="status"){   
    ulmensagens.innerHTML+=`<div class="status">
   (${mensagens[i].time})&nbsp <span>${mensagens[i].from}&nbsp</span> ${mensagens[i].text}\n</div>`       
   }else if (mensagens[i].type==="message"){
    ulmensagens.innerHTML+=`<div class="message">
    (${mensagens[i].time})&nbsp <span>${mensagens[i].from}</span>&nbsp para &nbsp<span>${mensagens[i].to}</span>:&nbsp${mensagens[i].text}\n</div>`
   }else if (mensagens[i].type==="private-message"){
    ulmensagens.innerHTML+=`<div class="private-message">
    (${mensagens[i].time})&nbsp <span>${mensagens[i].from}</span>&nbsp para &nbsp<span>${mensagens[i].to}</span>:&nbsp${mensagens[i].text}\n</div>`
   }   
}
}
function tratarErro(erro) {
    if (erro.status >= 400) {
        console.log("erro do usuário");
    }
}