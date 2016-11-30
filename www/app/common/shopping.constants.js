var shopSettings = {
	payPalSandboxId :"AarPUH3FeaEsjghwSfoz17lPiFoV-Ruc6pSNc2eYKyXC7NE0KAygdVUl8Kzr5GBHXeMFB9w6ASAvZLP_",

	payPalProductionId : "",
	payPalEnv: "PayPalEnvironmentSandbox", // for testing production for production

	payPalShopName : "",

	payPalMerchantPrivacyPolicyURL : "‘url to policy’",

	payPalMerchantUserAgreementURL : "‘ url to user agreement ‘"
	
};

angular.module('entryPoint')
.constant('shopSettings', shopSettings);

