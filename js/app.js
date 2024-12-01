$(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};

var MEU_CARRINHO = [];

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
            //outro replace para identificar qual item esta sendo adicionado ou removido
            .replace(/\${id}/g, e.id)

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

    //manipulação dos botoes adicionar e remover pedidos com id
    //diminuir quantidade/ .text para pegar a quantidade atual que é 0
    diminuirQuantidade: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());
        //validar para não ser menor que 0
        if(qntdAtual > 0){
            $("#qntd-" + id).text(qntdAtual -1);
        }
    },

    //aumentar quantidade
    aumentarQuantidade: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());
        $("#qntd-" + id).text(qntdAtual +1);

    },

    //adicionar no carrinho os itens do cardapio
    adicionarCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).text());
        //validar para adicionar itens no carrinho só quado for maior que 0
        if(qntdAtual > 0) {
            //obter a categoria ativa para filtrar o menu e obter o item
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];
            //obter a lista de itens
            let filtro = MENU[categoria];
            //obter todo o conteudo do item/ .grep retorna um objeto inteiro
            let item = $.grep(filtro, (e, i) => {
                return e.id == id
            });

            //validar com length que valida o tamanho ou seja se for maior que 0
            if(item.length > 0) {

                //validar se já existe o item no carrinho
                let existe = $.grep(MEU_CARRINHO, (elem, index) => {
                    return elem.id == id
                });

                //se exixtir o item ele vai ser só alterado a quantidade e não no item
                if(existe.length > 0) {
                    //vamos procurar a posição do nosso item para aumentar a quantidade usando o .findIndex
                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;

                }else {
                    //se não exixtir o item ai sim pode adicionar ao carrinho
                    //adicionar ao carrinho a quantidade de itens em 1 unidade só sem repetir esse item
                    item[0].qntd = qntdAtual;
                    //.push para adicionar os itens na lista de array
                    MEU_CARRINHO.push(item[0])
                }

                //vamos zerar a quantidade de item atual após ser adicionado ao carrinho
                cardapio.metodos.mensagem('Item adicionado ao carrinho', 'green');
                $("#qntd-" + id).text(0)

                cardapio.metodos.atualizarBadgeTotal();

            }
        }

    },

    //atualiza o total dos itens no meu botão flutuante "meu carrinho"
    atualizarBadgeTotal: () => {

        //percorrer nosso carrinho para somar os itens
        var total = 0;
        $.each(MEU_CARRINHO, (i, e) => {
            total += e.qntd
        })

        //validar se tiver coisa no carrinho, removemos a classe hidden para ele ser exibido
        if(total > 0) {
            $(".botao-carrinho").removeClass('hidden')
            $(".container-total-carrinho").removeClass('hidden')
        }else {
            $(".botao-carrinho").addClass('hidden')
            $(".container-total-carrinho").addClass('hidden')
        }

        $(".badge-total-carrinho").html(total);

    },

    //quando clicar no botão de sacola flutuante vai abrir o carrinho de compras
    abrirCarrinho: (abrir) => {
        if(abrir) {
            $("#modalCarrinho").removeClass('hidden');
        }else {
            $("#modalCarrinho").addClass('hidden');
        }
    },

    mensagem: (texto, cor="red", tempo = 3500) => {
        
        //criando id aleatoria que não se repete
        let id = Math.floor(Date.now() * Math.random()).toString();
        
        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;
        $("#container-mensagens").append(msg);

        //usamos setTimeout para dizer em qual tempo a função que foi passada pra ele vai ser exibida ou vai funcionar
        setTimeout(() => {
            //removendo e adicionando classes para fazer animação
            $("#msg-" + id).removeClass('fadeInDown');
            $("#msg-" + id).addClass('fadeOutUp');
            //nesse caso vamos remover a mensagem em 3 segundos
            setTimeout(() =>{
                $("#msg-" + id).remove();
            }, 800);
        }, tempo)
    }
}

//cada vez que passar pelo .each do filtro vai ter um elemento e do filtro diferente, por 12 vezes
//criando variavel na img, nome e preço \${}
cardapio.templates = {
    //vamos usar a propriedade dos itens para substituir, encotramos no console.log
    //variavel dentro das funções /\${img}/g /\${nome}/g /\${preco}/g esse tipo de variavel é global e se chama rejex
    item: 
`
    <div class="col-3 mb-5">
        <div class="card card-item" id="\${id}">
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
                <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="add-numero-itens" id="qntd-\${id}">0</span>
                <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add" onclick="cardapio.metodos.adicionarCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>                    
            </div>
        </div>
    </div>
`


}