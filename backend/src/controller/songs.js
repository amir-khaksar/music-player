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
