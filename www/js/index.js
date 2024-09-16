fetch('js/backend.json')
.then(response => response.json())
.then(data => {
    // SALVAR DADOS VINDOS DO BACK-END LOCALMENTE
    // VAMOS UTILIZAR O LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify());
    console.log('Dados dos produtos Salvos no LocalStorage');

    $("#produtos").empty();

    data.forEach(produto => {
        var produtoHTML = `<div class="item-card">
                                <a href="#" class="item">
                                    <div class="img-container">
                                        <img src=${produto.imagem}>
                                    </div>
                                    <div class="nome-rating color-gray">
                                        <span>${produto.nome}</span>
                                        <span class="bold margin-right">
                                            <i class="mdi mdi-star"></i>
                                            ${produto.rating}
                                        </span>
                                    </div>
                                    <div class="price">
                                        ${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </div>
                                </a>
                            </div>`
                        
        $("#produtos").append(produtoHTML);
    });

})