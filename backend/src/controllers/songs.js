const supabase = require("../lib/supabase");

exports.getAll = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 20 } = req.query;

        const from = (Number(page) - 1) * Number(limit);
        const to = from + Number(limit) - 1;

        let query = supabase
            .from("songs")
            .select("*", { count: "exact" })
            .order("id", { ascending: false })
            .range(from, to);

        if (search.trim()) {
            query = query.or(
                `title.ilike.%${search}%,artist.ilike.%${search}%`,
            );
        }

        const { data, count, error } = await query;

        if (error) throw error;

        res.status(200).json({
            songs: data,
            pagination: {
                total: count,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(count / Number(limit)),
            },
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getOne = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("songs")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.json(data);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.createSong = async (req, res) => {
    try {
        const { title, artist, audio_url, cover_url, duration } = req.body;

        const { data, error } = await supabase
            .from("songs")
            .insert({
                title,
                artist,
                audio_url,
                cover_url,
                duration,
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

exports.uploadOne = async (req, res) => {
    try {
        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        const { error } = await supabase.storage
            .from("songs")
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        const {
            data: { publicUrl },
        } = supabase.storage.from("songs").getPublicUrl(fileName);

        res.json({ url: publicUrl });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteOne = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase.from("songs").delete().eq("id", id);

    if (error) {
        return res.status(500).json(error);
    }

    res.json({
        message: "Music Deleted!",
    });
};

exports.likeSong = async (req, res) => {
    try {
        const { songId } = req.params;

        const { id } = req.user;

        const { data, error } = await supabase
            .from("liked_songs")
            .insert({
                user_id: id,
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

exports.unlikeSong = async (req, res) => {
    try {
        const { songId } = req.params;

        const { id } = req.user;

        const { error } = await supabase
            .from("liked_songs")
            .delete()
            .eq("user_id", id)
            .eq("song_id", songId);

        if (error) throw error;

        res.json({
            message: "Song unliked",
        });
    } catch (err) {
        res.status(200).json({
            message: "Song unliked",
        });
    }
};

exports.getLikedSongs = async (req, res) => {
    try {
        const { id } = req.user;

        const { data, error } = await supabase
            .from("liked_songs")
            .select(
                `
        song_id,
        songs (*)
      `,
            )
            .eq("user_id", id);

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
