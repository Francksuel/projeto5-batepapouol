let nome=prompt("Qual seu lindo nome?")
let usuario = {
    name: nome,
};
let mensagens=[];
login();
function login() {    
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    requisicao.then(refreshMensagens);
    requisicao.catch(usuarioInvalido);
}
function usuarioInvalido(resposta){
    while (resposta.response.status==400){
        nome=prompt("Nome de usuário já existe. Tente outro:")
usuario = {
    name: nome,
};
resposta = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
resposta.then(refreshMensagens);
resposta.catch(usuarioInvalido);
}
}

function refreshMensagens(){
    obterMensagens();
    setInterval(obterMensagens,3000);
    setInterval(manterLogin,5000);
}
function manterLogin(){
axios.post("https://mock-api.driven.com.br/api/v6/uol/status",usuario);
}
function obterMensagens() {  
    const promess = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promess.then(processarResposta);
    promess.catch(tratarErro);
    } 
function processarResposta(resposta) {   
    mensagens=resposta.data;   
   let ulmensagens=document.querySelector(".mensagens");
   ulmensagens.innerHTML=""
   for (let i=0;i<mensagens.length;i++){ 
   if (mensagens[i].type==="status"){   
    ulmensagens.innerHTML+=`<div class="status">
   <p><span class="tempo">(${mensagens[i].time})</span> <span class="bold">${mensagens[i].from}</span> ${mensagens[i].text}</p></div>`       
   }else if (mensagens[i].type==="message"){
    ulmensagens.innerHTML+=`<div class="message">
    <p><span class="tempo">(${mensagens[i].time})</span> <span class="bold">${mensagens[i].from}</span> para <span class="bold">${mensagens[i].to}</span>: ${mensagens[i].text}</p></div>`
   }else if (mensagens[i].type==="private_message"){
    if (mensagens[i].to===usuario.name){
    ulmensagens.innerHTML+=`<div class="private_message">
    <p><span class="tempo">(${mensagens[i].time})</span> <span class="bold">${mensagens[i].from}</span> para <span class="bold">${mensagens[i].to}</span>: ${mensagens[i].text}</p></div>`
   }     
}
   }
document.querySelector(".mensagens").lastChild.scrollIntoView();
}
function enviarMensagem(){   
let envio=document.querySelector("input").value
let mensenviada={
    from:nome,
    to:"Todos",
    text:envio,
    type:"message"  
}
document.querySelector("input").value=""
let promess=axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensenviada)
promess.catch(deslogado);
}
function deslogado(){
    alert("Usuário está deslogado")
    window.location.reload()
}
function tratarErro(){
    alert ("Deu erro ai")
}