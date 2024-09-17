// Recuperar o detalhe no LocalStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if(item) {
    // TEM O ITEM
    console.log('Produto Encontrado:', item);
} else {
    //NÃO TEM O ITEM
    console.log('Produto não encontrado', item);
}