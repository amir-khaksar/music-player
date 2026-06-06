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
