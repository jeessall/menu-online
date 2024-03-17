//precisamos chamar o cardapio.metodos e obterItensCardapio assim:

cardapio.eventos = {


    }

//vai obter a lista de itens do cardapio
//usando replace para substituir o elemento do for each (e) pelo img e.img, assim todos os elementos vão ter a devida imagem correta do produto
//vamos usar a propriedade dos itens para substituir, encotramos no console.log
//variavel dentro das funções /\${img}/g /\${nome}/g /\${preco}/g esse tipo de variavel é global e se chama rejex
//no price vamos usar o toFixed(2) para formatar nosso preço com 2 casas decimais vai ficar $54,00
//damos outro .replace para substituir tudo que for . por , ex: toFixed(2).replace('.', ',')
//exixte o tipo int e tipo float, o float vem com ponto geralmente de um banco de dados, quando consumimos
//vamos usar nossa div com id itensCardapio, para cada item do templates ser adicionado com Jquery]
//usando .append significa que queremos adicionar dentro do html itensCardapio alguma coisa, e nesse caso vai ser o temp que criamos

cardapio.metodos = {

}

//cada vez que passar pelo .each do filtro vai ter um elemento e do filtro diferente, por 12 vezes
//criando variavel na img, nome e preço \${}

cardapio.templates = {
    item:
    `
    <div class="col-3 mb-3">
        <div class="card card-item">
        <div class="img-produto">
            <img src="\${img}" alt=""/>
        </div>
            <p class="title-produto text-center mt-4">
                <b>\${name}</b>
            </p>               
            <p class="price-produto text-center">
                <b>R$ \${price}</b>
            </p>                   
            <div class="add-carrinho">
                <span class="btn-menos"><i class="fas fa-minus"></i></span>
                <span class="add-numero-itens">0</span>
                <span class="btn-mais"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>                    
            </div>
        </div>
    </div>
`

}