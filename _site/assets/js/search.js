// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

//Create the lunr index for the search

var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

//Add to this index the proper metadata from the Jekyll content



index.addDoc({
  title: "Collection",
  author: "Beatriz Goubert",
  layout: "page",
  content: "Bosa (Asociación Cuza Bague), Cabildo Indígena Muisca de. Ceramica Muisca: Testimonio Tangible De Una Cultura En Recuperación. Bogotá: Alcaldía Mayor de Bogotá, 2010.\n\n\n\n\n\nCabildo Indígena Muisca de Suba. Ley De Origen. Bogotá: Alcaldía Mayor de Bogotá; Asociación de Cabildos Indígenas ASCAI; 2007. https://drive.google.com/drive/search?q=ley%20de%20origen.\n\n\n\n\n\nInstituto Distrital de Patrimonio Cultural. “Tejiendo La Palabra: Voces y Relatos. Una Aproximación a La Literatura Oral Del Territorio Muisca De Bosa.” Instituto Distrital de Patrimonio Cultural, 2007. https://drive.google.com/drive/folders/0B4fdEzlYen_mTXl1MzUtZlNWMGM.\n\n\n\n\n\nSegura, Juan, and Torres, Janeth. Aquí– Allá : Imaginario Indígena Urbano. Bogotá: Fundación Terra Nova, 2005. https://drive.google.com/drive/folders/0B4fdEzlYen_mTXl1MzUtZlNWMGM.\n\n\n\n\n\nSuba, Cabildo Indígena Muisca de. Los Muisca: Un Pueblo En Reconstrucción. Bogotá: MJ Editores Ltda, 1999.\n\n\n\n\n\n“ELESPECTADOR.COM \\Textbar Principales Noticias De Colombia y El Mundo,” n.d. https://www.elespectador.com/noticias.\n\n\n\n\n\nSuba, Cabildo Indígena Muisca de. “Muiskak Guechak Muiscas Guerreros.” Alcaldía Local de Suba, n.d. https://drive.google.com/drive/folders/0B4fdEzlYen_mTXl1MzUtZlNWMGM.\n\n\n\n\n\n",
  id: 0
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)


var store = [{
  "title": "Collection",
  "author": "Beatriz Goubert",
  "layout": "page",
  "link": "/texts/library/",
}
]

//Query

var qd = {}; //Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  //The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  //Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="/muiscalibrary'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
