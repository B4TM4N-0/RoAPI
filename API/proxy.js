const axios = require('axios');

export default async function handler(req, res) {
    const { path, userId } = req.query;
    
    let URL = "";
    if (path === "users") {
        URL = `https://roblox.com{userId}`;
    } else if (path === "premium") {
        URL = `https://roblox.com{userId}/validate-membership`;
    }

    try {
        const response = await axios.get(URL);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: "Proxy Error" });
    }
}
