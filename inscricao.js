let botao = document.getElementById('botao')
let tabela = document.getElementById('tabela_de_cadastro')
let formulario = document.getElementById('inserir_dados')

let painel_de_alteracao = document.getElementById('painel_de_alteracao')
let nomeAlterar = document.getElementById('nome_alterar');
let emailAlterar = document.getElementById('email_alterar');
let idadeAlterar = document.getElementById('idade_alterar');
let botao_alterar = document.getElementById('botao_alterar')

botao_alterar.addEventListener('click', confirmar_alteracao)

botao.addEventListener('click', guardar)

window.onload = function(){
    if (localStorage.getItem('dados') != null){
        cadastro = JSON.parse(localStorage.getItem('dados'))
    }
    listar() 
}   

let cadastro = []
var dados_dos_inputs 
var guardar_id
var exclusao = false

function guardar() {
    let nome = document.getElementById('nome').value
    let idade = document.getElementById('idade').value
    let email = document.getElementById('email').value

    cadastro.push({id: cadastro.length, nomeCliente: nome, idadeCliente: idade, emailCliente: email})
        localStorage.setItem('dados',JSON.stringify(cadastro))
        guardar_dados(cadastro.length-1)

        formulario.reset()

}

function guardar_dados(tamanho_do_cadastro){
    dados_dos_inputs = JSON.parse(localStorage.getItem('dados'))
    tabela.innerHTML += `<tr>     
                            <td>${dados_dos_inputs[tamanho_do_cadastro]['id']}</td>
                            <td>${dados_dos_inputs[tamanho_do_cadastro]['nomeCliente']}</td>
                            <td> ${dados_dos_inputs[tamanho_do_cadastro]['idadeCliente']}</td>
                            <td> ${dados_dos_inputs[tamanho_do_cadastro]['emailCliente']}</td>
                            <td><button class="excluir" type="button" onclick=excluir(${tamanho_do_cadastro})>Excluir</button></td>
                            <td><button class="alterar" type="button" onclick=alterar(${tamanho_do_cadastro})>Alterar</button></td>
                         </tr>` 
                         
}
function listar() {
    for (var i in cadastro) {
        tabela.innerHTML += `<tr>
                            <td>${i}</td>         
                            <td>${cadastro[i]['nomeCliente']}</td>                            
                            <td> ${cadastro[i]['idadeCliente']}</td>                             
                            <td> ${cadastro[i]['emailCliente']}</td>
                            <td><button class="excluir" type="button" onclick=excluir(${i})>Excluir</button></td>
                            <td><button class="alterar" type="button" onclick=alterar(${i})>Alterar</button></td>
                            </tr>`

    }
}

function excluir(id_do_elemento) {
    exclusao = true
    cadastro.splice(id_do_elemento,1)
    localStorage.setItem('dados',JSON.stringify(cadastro))
    tabela.innerHTML = ""
    listar()
}

function alterar(id_do_elemento) {
    exclusao = false
    let alteracao = cadastro[id_do_elemento]
    guardar_id  = id_do_elemento
    nomeAlterar.value = alteracao.nomeCliente;
    emailAlterar.value = alteracao.emailCliente;
    idadeAlterar.value = alteracao.idadeCliente;
    painel_de_alteracao.style.display = "block";
    botao.style.display = "none";
    

}
// Confirmo a alteração, caso um elemento seja excluído no meio da mudança ele não faz nada.
function confirmar_alteracao() {
    if (exclusao == false) {
    cadastro[guardar_id].nomeCliente = nomeAlterar.value
    cadastro[guardar_id].emailCliente = emailAlterar.value
    cadastro[guardar_id].idadeCliente = idadeAlterar.value 
    localStorage.setItem('dados',JSON.stringify(cadastro))
    tabela.innerHTML = ""
    painel_de_alteracao.style.display = "none";
    botao.style.display = "block";
    listar()
    guardar_id = undefined
    }else {
        alert("Um elemento foi excluído no meio da alteração, nenhuma mudança feita")
        exclusao = false
        painel_de_alteracao.style.display = "none";
        botao.style.display = "block";
        tabela.innerHTML = ""
        listar()
    }
}

function fechar_tela() {
    painel_de_alteracao.style.display = "none";
    tabela.innerHTML = ""
    listar()
}