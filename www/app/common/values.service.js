angular.module('entryPoint')

	// Centralized page info for all Orcamento pages
	.value('Listas', {
		superMercadoList: [
		{
			nome : 'Carrefour',
			img: 'img/carre.jpg'

		},
		{
			nome : 'Bompreço',
			img: 'img/hiperl.png'

		},
		{
			nome : 'Extra',
			img: 'img/extra.jpg'

		}],
		listasCompras : [],
		listaCarrinho: {},
		supermercadoCarrinho: {}
	})
	.value('AppValues', {
		hasSupermercadoSearched : false,
		superMercadoSearched : {
			nomeSupermercado : ''
		}
	})
	.value('configurationUrl', {
		// url : 'http://marketwsapp-weeb.rhcloud.com'

		url: 'http://localhost:8080/MD_WEB/rest'

	});
