let botao = document.getElementById('botao')
let tabela = document.getElementById('tabela_de_cadastro')
let formulario = document.getElementById('inserir_dados')
botao.addEventListener('click', guardar)

window.onload = function(){
    if (localStorage.getItem('dados') != null){
        cadastro = JSON.parse(localStorage.getItem('dados'))
    }
    listar() 
}   

let cadastro = []
var dados_dos_inputs 
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
                            </tr>`

    }
}

function excluir(id_do_elemento) {
    cadastro.splice(id_do_elemento,1)
    localStorage.setItem('dados',JSON.stringify(cadastro))
    tabela.innerHTML = ""
    listar()
}