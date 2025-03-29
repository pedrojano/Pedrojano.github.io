/*pra isso vamos precisar trabalhar com dois elementos
1- listagem
2- cartão pokemon*/

// precisamos criar duas variáveis no JS para trabalhar com os elementos da tela 
const listaSelecaoPokemons = document.querySelectorAll('.pokemon')
const pokemonsCard = document.querySelectorAll('.cartao-pokemon')

//quando clicar no pokemon da listagem temos que esconder o cartão do pokemon aberto e mostrar o cartão do pokemon correspondente ao que foi selecionado na listagem

listaSelecaoPokemons.forEach(pokemon => {

    // vamos precisar trabalhar com um evento do clique feito pelo usuarário na listagem de pokemons
         pokemon.addEventListener("click", () => {

        // -remover a clase aberto só do cratão que está aberto
        const cartaoPokemonAberto = document.querySelector(".aberto")
        cartaoPokemonAberto.classList.remove("aberto")

        // ao clicar em um pokemon da listagem pegamos o id desse pokemon pra saber qual cartão mostrar
        const idPokemonSelecionado = pokemon.attributes.id.value

        const idDoCartaoPokemonParaAbrir = "cartao-" + idPokemonSelecionado
        const cartaoPokemonParaAbrir = document.getElementById(idDoCartaoPokemonParaAbrir)
        cartaoPokemonParaAbrir.classList.add("aberto")

        // -remover a classe ativa que marca o pokemon selecionado
        const pokemonAtivoNaListagm = document.querySelector(".ativo")
        pokemonAtivoNaListagm.classList.remove("ativo")

        // -adicionar a classe ativo no item da lista selecionado
        const pokemonSelecionadoNaListagem = document.getElementById(idPokemonSelecionado)
        pokemonSelecionadoNaListagem.classList.add("ativo")
    })
})



