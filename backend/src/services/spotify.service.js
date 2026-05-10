const axios = require("axios");
const spotifyConfig = require("../config/spotify");

async function exchangeCodeForToken(code) {
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }).toString();

    const response = await axios.post(spotifyConfig.tokenUrl, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
                ).toString("base64"),
        },
    });

    return response.data;
}

async function refreshAccessToken(refreshToken) {
    const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    }).toString();

    const response = await axios.post(spotifyConfig.tokenUrl, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
                ).toString("base64"),
        },
    });

    return response.data;
}

async function searchTracks(query, accessToken) {
    const response = await axios.get(`${spotifyConfig.apiBaseUrl}/search`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: query, type: "track", limit: 20 },
    });

    return response.data;
}

module.exports = { exchangeCodeForToken, refreshAccessToken, searchTracks };
