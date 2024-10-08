const express = require('express');
const { getSignature, getHeader } = require('../utils/helpers');
const { PLATFORM_VERSION_API, HIKVISION_BASE_URL, HIKVISION_APP_KEY } = require('../utils/config');
const { default: axios } = require('axios');
const router = express.Router();
const https = require('https');

// Create an HTTPS agent that ignores SSL certificate errors
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

/* GET root */
router.get('/', function(req, res, next) {
  res.status(200).json({ hello: "world" });
});

/* GET HikCentral version */
router.get('/version', async function(req, res, next) {
  const calcSignature = getSignature(PLATFORM_VERSION_API);
   
  try {
    const response = await axios({
      method: 'post',
      url: HIKVISION_BASE_URL + PLATFORM_VERSION_API,
      headers: getHeader(HIKVISION_APP_KEY, calcSignature),
      timeout: 5000,
      httpsAgent: httpsAgent
    });

    console.log('response: ', response.data);
    res.status(200).json({ response: response.data });
  } 
  catch (error) {
    console.error('Error message: ', error.message);
    res.status(error.status).json({ Error: error.message });

  }
  
  // res.status(200).json({ hello: "world" });
});

module.exports = router;
