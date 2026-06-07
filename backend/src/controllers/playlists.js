const supabase = require("@supabase/supabase-js");

exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser(req.token);

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
