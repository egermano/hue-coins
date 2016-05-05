/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui'),
    ajax = require('ajax');

var sources = [
    {
      uid: 'dolar',
      title: 'Dolar',
      url: 'http://developers.agenciaideias.com.br/cotacoes/json',
      responseData: {},
      parse: function(data) {
        return data.dolar.cotacao + '(' + data.dolar.variacao + ')';
      }
    },
    {
      uid: 'bovespa',
      title: 'Bovespa',
      url: 'http://developers.agenciaideias.com.br/cotacoes/json',
      responseData: {},
      parse: function(data) {
        return data.bovespa.variacao;
      }
    },
    {
      uid: 'mercado',
      title: 'Mercado Biticoin',
      url: 'https://www.mercadobitcoin.net/api/ticker/',
      responseData: {},
      parse: function(data) {
        return data.ticker.last;
      }
    },
    {
      uid: 'btc2u',
      title: 'Bitcoins 2 You',
      url: 'https://www.bitcointoyou.com/api/ticker.aspx',
      responseData: {},
      parse: function(data) {
        return data.ticker.last;
      }
    },
    {
      uid: 'Fox Bit',
      title: 'Fox Bit',
      url: 'https://api.blinktrade.com/api/v1/BRL/ticker?crypto_currency=BTC',
      responseData: {},
      parse: function(data) {
        return data.last;
      }
    },
  ],
  dataSources = [],
  currentIndex = 0;

function loadData () {
  var done = 0;

  for (var i = 0; i < sources.length; i++) {
    // Make the request

    ajax(
      {
        url: sources[i].url,
        type: 'json'
      },
      function(res) {
        // Success!
        done++;
        dataSources.push(res);

        if (done==sources.length) {
          currentIndex=0;
          showIndex(currentIndex);
        }
      }
    );
  }

}

function showIndex (index) {
  main.title(sources[currentIndex].title);
  main.subtitle(sources[currentIndex].parse(dataSources[currentIndex]));
}

var main = new UI.Card({
  title: 'Carregando',
  subtitle: 'Aguarde...'
});

main.show();
loadData();

main.on('click', 'up', function(e) {
  currentIndex = --currentIndex;
  currentIndex = currentIndex < 0 ? currentIndex=sources.length - 1 : currentIndex;

  showIndex(currentIndex);
});

main.on('click', 'select', function(e) {
  main.title('Atualizando');
  main.subtitle('Aguarde...');
  loadData();
});

main.on('click', 'down', function(e) {
  currentIndex = ++currentIndex;
  currentIndex = currentIndex >= sources.length ? 0 : currentIndex;

  showIndex(currentIndex);
});
