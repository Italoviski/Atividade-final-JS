
var filmes = [
  { titulo: "Matrix", ano: 1999, genero: "Ficção", nota: 8.7, poster: "img/matrix.png" },
  { titulo: "Toy Story", ano: 1995, genero: "Animação", nota: 8.3, poster: "img/toystory.png" },
  { titulo: "O Poderoso Chefão", ano: 1972, genero: "Drama", nota: 9.2, poster: "img/poderosochefao.png" },
  { titulo: "Cidade de Deus", ano: 2002, genero: "Drama", nota: 8.6, poster: "img/cidadedeus.png" },
  { titulo: "Interestelar", ano: 2014, genero: "Ficção", nota: 8.7, poster: "img/interestelar.png" },
  { titulo: "Pulp Fiction", ano: 1994, genero: "Crime", nota: 8.9, poster: "img/pulpfiction.png" },
  { titulo: "Shrek", ano: 2001, genero: "Animação", nota: 7.9, poster: "img/shrek.png" },
  { titulo: "Os Vingadores", ano: 2012, genero: "Ação", nota: 8.0, poster: "img/vingadores.png" },
  { titulo: "Parasita", ano: 2019, genero: "Suspense", nota: 8.5, poster: "img/parasita.png" }
];

var favoritos = [];
var listaAtual = [];
var ordemInvertida = false;

var catalogo = document.getElementById("catalogo");
var contador = document.getElementById("contador");
var busca = document.getElementById("busca");
var filtroGenero = document.getElementById("filtro-genero");
var btnInverter = document.getElementById("btn-inverter");
var titulo = document.getElementById("titulo");
var destaque = document.getElementById("destaque");
var contadorFavoritos = document.getElementById("contador-favoritos");
var listaFavoritos = document.getElementById("lista-favoritos");
var mensagem = document.getElementById("mensagem");
var btnLimpar = document.getElementById("btn-limpar-favoritos");

function mostrarFilmes(lista) {
 
  if (lista.length == 0) {
    catalogo.innerHTML = "<p class='vazio'>Nenhum filme encontrado</p>";
  } else {
    var html = "";

    for (var i = 0; i < lista.length; i++) {
      var filme = lista[i];
      var indice = filmes.indexOf(filme);

      var selo = filme.nota >= 8 ? "<span class='selo'>⭐ Recomendado</span>" : "";

      html += "<div class='card'>";
      html += "<img src='" + filme.poster + "' alt='" + filme.titulo + "' onerror='this.style.display=\"none\"'>";
      html += "<h3>" + filme.titulo + "</h3>";
      html += "<p>Ano: " + filme.ano + "</p>";
      html += "<p>Gênero: " + filme.genero + "</p>";
      html += "<p>Nota: " + filme.nota.toFixed(1) + "</p>";
      html += selo;
      html += "<br><button onclick='favoritar(" + indice + ")'>♥ Favoritar</button>";
      html += "</div>";
    }

    catalogo.innerHTML = html;
  }

  contador.innerText = lista.length;
}

function aplicarFiltros() {
  var texto = busca.value.toLowerCase();
  var genero = filtroGenero.value;
  var resultado = [];

  for (var i = 0; i < filmes.length; i++) {
    var achouNome = filmes[i].titulo.toLowerCase().includes(texto);
    var achouGenero;

    if (genero == "Todos") {
      achouGenero = true;
    } else {
      achouGenero = filmes[i].genero == genero;
    }

    if (achouNome && achouGenero) {
      resultado.push(filmes[i]);
    }
  }

  if (ordemInvertida) {
    resultado.reverse();
  }

  listaAtual = resultado;
  mostrarFilmes(listaAtual);
}

function preencherGeneros() {
  var generos = [];

  for (var i = 0; i < filmes.length; i++) {
    if (generos.indexOf(filmes[i].genero) == -1) {
      generos.push(filmes[i].genero);
    }
  }

  for (var j = 0; j < generos.length; j++) {
    filtroGenero.innerHTML += "<option value='" + generos[j] + "'>" + generos[j] + "</option>";
  }
}

busca.addEventListener("input", aplicarFiltros);
filtroGenero.addEventListener("change", aplicarFiltros);


btnInverter.addEventListener("click", function () {
  ordemInvertida = !ordemInvertida;
  listaAtual.reverse();
  mostrarFilmes(listaAtual);
});


function favoritar(indice) {
  var nomeFilme = filmes[indice].titulo;

  if (favoritos.includes(nomeFilme)) {
    mensagem.innerText = "Esse filme já está nos favoritos!";
  } else {
    favoritos.push(nomeFilme);
    mensagem.innerText = "";
    atualizarFavoritos();
  }
}

function atualizarFavoritos() {
  contadorFavoritos.innerText = favoritos.length;

  if (favoritos.length == 0) {
    listaFavoritos.innerHTML = "<li>Nenhum favorito ainda.</li>";
  } else {
    var html = "";
    for (var i = 0; i < favoritos.length; i++) {
      html += "<li>" + favoritos[i] + "</li>";
    }
    listaFavoritos.innerHTML = html;
  }
}

btnLimpar.addEventListener("click", function () {
  favoritos = [];
  mensagem.innerText = "";
  atualizarFavoritos();
});


titulo.addEventListener("mouseenter", function () {
  titulo.style.color = "yellow";
});

titulo.addEventListener("mouseout", function () {
  titulo.style.color = "#ff3333";
});

destaque.addEventListener("mouseenter", function () {
  destaque.style.backgroundColor = "yellow";
});

destaque.addEventListener("mouseout", function () {
  destaque.style.backgroundColor = "#ff9900";
});

preencherGeneros();
listaAtual = filmes.slice();
mostrarFilmes(filmes);
atualizarFavoritos();