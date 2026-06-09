const supabase = require("@supabase/supabase-js");

exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.user;

        if (userError) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { data, error } = await supabase
            .from("playlists")
            .insert({
                user_id: user.id,
                name,
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.getMyPlaylists = async (req, res) => {
    try {
        const { id } = req.user;

        const { data, error } = await supabase
            .from("playlists")
            .select("*")
            .eq("user_id", id);

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const { error } = await supabase
            .from("playlists")
            .delete()
            .eq("id", playlistId);

        if (error) throw error;

        res.json({
            message: "Playlist deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;

        const { data, error } = await supabase
            .from("playlist_songs")
            .insert({
                playlist_id: playlistId,
                song_id: songId,
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const { error } = await supabase
            .from("playlist_songs")
            .delete()
            .eq("playlist_id", playlistId)
            .eq("song_id", songId);

        if (error) throw error;

        res.json({
            message: "Song removed",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
