const crypto = require('crypto');
const { HIKVISION_APP_KEY, HIKVISION_APP_SECRET } = require('./config');

function getHeader(appKey, signature) {
   return headers = {
      "x-ca-key": appKey,
      "x-ca-signature": signature,
      "x-ca-signature-headers": "x-ca-key",
      "content-type": "application/json",
      "accept": "*/*"
   }
}

function getSignature(apiPath) {
   const stringToSign = `POST
*/*
application/json
x-ca-key:${HIKVISION_APP_KEY}
${apiPath}`;
   
   // appLogger.info('stringToSign - ' + stringToSign);
   console.info('stringToSign - ' + stringToSign);
   
   // Create an HMAC object using SHA256 and the secret key
   const hmac = crypto.createHmac('sha256', HIKVISION_APP_SECRET);
   
   // Update the HMAC object with the data to sign
   hmac.update(stringToSign, 'utf8');
   
   // Calculate the HMAC digest and encode it in Base64
   const signed = hmac.digest('base64');
   console.info('signed - ' + signed);

   return signed;
}

module.exports = {
   getHeader,
   getSignature
};
