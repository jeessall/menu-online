$(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};



cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
    }

    }

//exixte o tipo int e tipo float, o float vem com ponto geralmente de um banco de dados, quando consumimos



//precisamos chamar o cardapio.metodos e obterItensCardapio assim:
cardapio.metodos = {
    //vai obter a lista de itens do cardapio
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {
        var filtro = MENU[categoria];

        //para mudar para outra categoria do cardapio devemos limpar a categoria anterior para exibir somente a categoria escolhida
        if(!vermais) {
            $("#itensCardapio").html("")
            $("#btnVerMais").removeClass('hidden')
        }

        //usando replace para substituir o elemento do for each (e) pelo img e.img, assim todos os elementos vão ter a devida imagem correta do produto
        $.each(filtro, (i, e) => {
            //vamos usar o replace para substituir nossos elementos do template
            //variavel dentro das funções /\${img}/g /\${nome}/g /\${preco}/g esse tipo de variavel é global e se chama rejex
            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${nome}/g, e.name)
            //no price vamos usar o toFixed(2) para formatar nosso preço com 2 casas decimais vai ficar $54,00
            //damos outro .replace para substituir tudo que for . por , ex: toFixed(2).replace('.', ',')
            .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","))
            //vamos usar nossa div com id itensCardapio, para cada item do templates ser adicionado com Jquery]
            //usando .append significa que queremos adicionar dentro do html itensCardapio alguma coisa, e nesse caso vai ser o temp que criamos
            
            //vamos validar os itens do cardapio para ser exibido somente 8 itens por categoria, quando clicar no btn ver mais vai aparecer mais 4 itens dentro das categorias totalizando 12
            //o btn cai nesse if quando for verdadeiro e tiver mais que 8 itens
            if(vermais && i >= 8 && i < 12) {
                $("#itensCardapio").append(temp)
            }

            //itens da pagina inicial 8, colocamos exclamação ! para negar o btn
            //como o btn ver mais é = false ele cai no segundo if pq só exibe 8 itens
            if(!vermais && i < 8) {
                $("#itensCardapio").append(temp)
            }
            
        })

        //remover a class active das categorias quando alterar para outra categoria
        $(".container-menu a").removeClass('active');
        //adiciona a class active quando estiver na categoria selecionada
        $("#menu-" + categoria).addClass('active');
    },

    //vamos criar um metodo para o botão ver mais para quando clicar realizar as validações do nosso if feito acima e sumir com o botão
    verMais: () => {
        //var para descobrir qual botão está ativo fora do padrão 'burers', para todas as categorias
        //pegamos o attr (atributo = id do nosso elemento)
        //usamos o split do jquery para quebrar o texto em 2 virando um array do [menu] com indice 0 e [burgers] com indice 1
        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        //adicionando a classe hidden para ocultar o btn
        //no nosso if vamos remover a class hidde se o botão não for clicado, para poder realizar a ação novamente
        $("#btnVerMais").addClass('hidden');
    },
}

//cada vez que passar pelo .each do filtro vai ter um elemento e do filtro diferente, por 12 vezes
//criando variavel na img, nome e preço \${}
cardapio.templates = {
    //vamos usar a propriedade dos itens para substituir, encotramos no console.log
    //variavel dentro das funções /\${img}/g /\${nome}/g /\${preco}/g esse tipo de variavel é global e se chama rejex
    item: 
`
    <div class="col-3 mb-5">
        <div class="card card-item">
        <div class="img-produto">
            <img src="\${img}" alt=""/>
        </div>
            <p class="title-produto text-center mt-2">
                <b>\${nome}</b>
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