let imagens = [];
let indiceAtual = 0;
const imgElement = document.getElementById('imagemAtual');
const carregando = document.getElementById('carregando');

// Link da lista de novidades
const URL_LISTA = 'https://maistv-maker.github.io/mais-tv-dados/lista.json';

async function carregarNovidades() {
  try {
     const resposta = await fetch(URL_LISTA);
     imagens = await resposta.json();

       if (imagens.length > 0) {
           carregando.style.display = 'none';
           imgElement.style.display = 'block';
           mostrarImagem(0);
       } else {
           carregando.textContent = 'Nenhuma novidade adicionada ainda';
       }
    } catch (erro) {
       carregando.textContent = 'Erro ao carregar. Tente novamente mais tarde.';
       console.error('Erro ao carregar:', erro);
    }
}

function mostrarImagem(indice) {
  if (imagens.length === 0) return;
  indiceAtual = (indice + imagens.length) % imagens.length;
  imgElement.src = imagens[indiceAtual];
  imgElement.className = 'visivel';
}

// Botões de navegação
document.getElementById('btnEsq').addEventListener('click', () => {
    mostrarImagem(indiceAtual - 1);
});

document.getElementById('btnDir').addEventListener('click', () => {
    mostrarImagem(indiceAtual + 1);
});

// Carregar ao abrir
carregarNovidades();
