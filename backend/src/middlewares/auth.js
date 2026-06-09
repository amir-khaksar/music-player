exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];
    console.log("Token:", token);

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = user;

    next();
};
