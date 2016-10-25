angular.module('entryPoint')

	// Centralized page info for all Orcamento pages
	.value('Listas', {
		superMercadoList: [
		{
			nomeMercado : 'Carrefour'

		},
		{
			nomeMercado : 'Bompreço'

		},
		{
			nomeMercado : 'Extra'

		},
		{
			nomeMercado : 'Pão de Açucar'

		}]
	})
	.value('AppValues', {
		hasSupermercadoSearched : false,
		superMercadoSearched : {
			nomeSupermercado : ''
		}
	})
	.value('configurationUrl', {
		url : 'http://marketwsapp-weeb.rhcloud.com'

	});