var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length > 0) {
        //TEM ITENS NO CARRINHO
        //RENDERIZAR O CARRINHO
        renderizarCarrinho();
        //SOMAR TOTAIS DOS PRODUTOS
        calcularTotal();
    }else{
        //MOSTRAR CARRINHO VAZIO
        carrinhoVazio();
    }
}else{
    //MOSTRAR CARRINHO VAZIO
    carrinhoVazio();
}

function calcularTotal() {
    var totalCarrinho = 0;
    $.each(carrinho, function (index, itemCarrinho) {
        totalCarrinho += itemCarrinho.total_item;
    });
    //MOSTRAR O SUBTOTAL
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}

function carrinhoVazio() {
    console.log('Carrinho está vazio');
    //ESVAZIAR LISTA NO CARRINHO
    $("#listaCarrinho").empty();

    //SUMIR OS ITENS DE BAIXO: BOTÃO E TOTAIS
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    //MOSTRAR SACOLINHA VAZIA
    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span class="color-gray">Nada por enquanto...</span>
        </div>`)
}

function renderizarCarrinho() {
    //ESVAZIAR ÁREA DOS ITENS
    $("#listaCarrinho").empty();

    //PERCORRER O NOSSO CARRINHO E ALIMENTAR A ÁREA
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `<!-- ITEM DO CARRINHO -->
                         <div class="item-carrinho">
                            <div class="area-img">
                                <img src="${itemCarrinho.item.imagem}">
                            </div>
                            <div class="area-details">
                                <div class="sup">
                                    <span class="name-prod">
                                        ${itemCarrinho.item.nome}
                                    </span>
                                    <a class="delete-item" data-index="${index}" href="#">
                                        <i class="mdi mdi-close"></i>
                                    </a>
                                </div>
                                <div class="middle">${itemCarrinho.item.principal_caracteristica}</div>
                                <div class="preco-quantidade">
                                    <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    <div class="count">
                                        <a href="#" class="minus" data-index="${index}">-</a>
                                        <input readonly type="text" class="qtd-item" value="${itemCarrinho.quantidade}">
                                        <a href="#" class="plus" data-index="${index}">+</a>
                                    </div>
                                </div>
                            </div>
                         </div>`;

            $("#listaCarrinho").append(itemDiv);
    });

    $(".delete-item").on('click', function () {
        var index = $(this).attr('data-index');
        //CONFIRMAR
        app.dialog.confirm('Tem certeza que quer remover este item?', "REMOVER", function () {
            // REMOVER O ITEM DO CARRINHO
            carrinho.splice(index, 1);
            //ATUALIZAR O CARRINHO COM O ITEM REMOVIDO
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            //ATUALIZAR A PÁGINA
            app.views.main.router.refreshPage();
        });
    });


    $(".minus").on('click', function () {
        var index = $(this).attr('data-index');
        
        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();
        }else{
            var itemname = carrinho[index].item.nome;
            app.dialog.confirm(`Gostaria de remover <strong>${itemname}</strong> da lista?`,'REMOVER', function() {
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho();
                calcularTotal();

            })
        }
    });

    $(".plus").on('click', function () {
        var index = $(this).attr('data-index');
        
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();
        
    });
}

$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', '<strong>ESVAZIAR</strong>', function(){
        //APAGAR O LOCALSTORAGE DO CARRINHO
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    })
})

