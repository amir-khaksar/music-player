const spotifyConfig = {
    authUrl: "https://accounts.spotify.com/authorize",
    tokenUrl: "https://accounts.spotify.com/api/token",
    apiBaseUrl: "https://api.spotify.com/v1",
    scope: ["user-read-private", "user-read-email"].join(" "),
};

module.exports = spotifyConfig;
