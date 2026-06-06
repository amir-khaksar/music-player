const supabase = require("../lib/supabase");

exports.getAll = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("songs")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data);
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
