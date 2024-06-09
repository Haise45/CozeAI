const axios = require('axios');

const COZE_API_KEY = 'pat_RzAvz7WkA1TE79XRYfuboY09jYjFCmO9OvYbTo4BXB6NEMxPztUq8lq04cpriI2o';
const BOT_ID = '7376927058456657938';

async function handleRequest(req, res) {
    try {
        const response = await axios.post('https://api.coze.com/open_api/v2/chat', {
            conversation_id: req.body.conversation_id || '123',
            bot_id: BOT_ID,
            user: req.body.user || '123333333',
            query: req.body.query,
            stream: false
        }, {
            headers: {
                'Authorization': `Bearer ${COZE_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Host': 'api.coze.com',
                'Connection': 'keep-alive'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }
}

module.exports = {
    handleRequest
};
