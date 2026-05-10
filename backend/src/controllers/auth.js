const spotifyConfig = require("../config/spotify");
const {
    exchangeCodeForToken,
    refreshAccessToken,
    searchTracks,
} = require("../services/spotify.service");

let accessToken = null;
let refreshToken = null;

function login(req, res) {
    const params = new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope: spotifyConfig.scope,
    });

    res.redirect(`${spotifyConfig.authUrl}?${params.toString()}`);
}

async function callback(req, res) {
    const code = req.query.code;
    const tokenData = await exchangeCodeForToken(code);

    accessToken = tokenData.access_token;
    refreshToken = tokenData.refresh_token || null;

    res.redirect(process.env.FRONTEND_URL);
}

async function search(req, res) {
    try {
        if (!accessToken)
            return res.status(401).json({ message: "Not authenticated" });

        const query = req.query.q;
        const data = await searchTracks(query, accessToken);

        res.json(data);
    } catch (err) {
        if (refreshToken) {
            const newToken = await refreshAccessToken(refreshToken);
            accessToken = newToken.access_token;
            const data = await searchTracks(req.query.q, accessToken);
            return res.json(data);
        }
        res.status(500).json({ message: "Spotify request failed" });
    }
}

module.exports = { login, callback, search };
