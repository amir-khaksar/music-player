const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "audio/mpeg", // mp3
        "audio/wav", // wav
        "audio/ogg", // ogg
        "audio/flac", // flac
        "audio/mp4", // m4a
        "audio/aac", // aac
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only audio files are allowed."), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});

module.exports = upload;
