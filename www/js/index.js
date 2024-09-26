fetch('js/backend.json')
.then(response => response.json())
.then(data => {
    //SALVAR DADOS VINDOS DO BACK-END LOCALMENTE
    //VAMOS UTILIZAR LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos Salvos no localStorage');

    //SIMULAR CARREGAMENTO ONLINE COM DELAY

    setTimeout(() => {

        //ESVAZIAR A ÁREA DE PRODUTOS
        $("#produtos").empty();

        data.forEach(produto => {
            var produtoHTML = `<div class="item-card">
                                    <a data-id="${produto.id}" href="/detalhes/" class="item">
                                        <div class="img-container">
                                            <img class="img-fluid" src="${produto.imagem}" alt="">
                                        </div>
                                        <div class="nome-rating color-gray">
                                            <span>${produto.nome}</span>
                                            <span class="bold margin-right">
                                                <i class="mdi mdi-star"></i>
                                                ${produto.rating}
                                            </span>
                                        </div>
                                        <div class="price">${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                    </a>
                                </div>`

            $("#produtos").append(produtoHTML);
        });

        $(".item").on('click', function() {
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        })

    }, 1000 )
})
.catch(error => console.error('Erro ao fazer fetch dos dados: '+error));

//VER QUANTOS ITEMS ESTÃO DENTRO DO CARRINHO
setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //ALIMENTAR O CONTADOR
    $(".btn-cart").attr('data-count', carrinho.length);
}, 300);