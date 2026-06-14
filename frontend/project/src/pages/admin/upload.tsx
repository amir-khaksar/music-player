import { useState, useRef } from "react";
import { useUploadAudio } from "./hooks/useUploadAudio";
import { useCreateSong } from "./hooks/useCreateSong";
import { useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { Field } from "./components/Field";

export default function UploadPage() {
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);
    const [audioUrl, setAudioUrl] = useState("");
    const [form, setForm] = useState({
        title: "",
        artist: "",
        cover_url: "",
        duration: "",
    });

    const { mutate: uploadAudio, isPending: uploading } = useUploadAudio();
    const { mutate: createSong, isPending: creating } = useCreateSong();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        uploadAudio(file, {
            onSuccess: (url) => setAudioUrl(url),
        });
    };

    const handleSubmit = () => {
        if (!audioUrl || !form.title || !form.artist) return;
        createSong(
            {
                ...form,
                audio_url: audioUrl,
                duration: Number(form.duration),
            },
            { onSuccess: () => navigate("/admin") },
        );
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm">
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
                >
                    ← back to admin
                </button>

                <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.5)]">
                    <h2 className="text-white/90 text-lg font-medium mb-6">
                        Upload Song
                    </h2>

                    <div className="flex flex-col gap-4">
                        {/* File upload */}
                        <div
                            onClick={() => fileRef.current?.click()}
                            className={`border border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${
                                audioUrl
                                    ? "border-emerald-500/50 bg-emerald-500/5"
                                    : "border-white/15 hover:border-white/30"
                            }`}
                        >
                            <input
                                ref={fileRef}
                                type="file"
                                accept="audio/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {uploading ? (
                                <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                            ) : (
                                <Music
                                    size={22}
                                    className={
                                        audioUrl
                                            ? "text-emerald-400"
                                            : "text-white/25"
                                    }
                                />
                            )}
                            <p className="text-xs text-white/35">
                                {audioUrl
                                    ? "File Uploaded"
                                    : uploading
                                      ? "Uploading..."
                                      : "Put the audio file here"}
                            </p>
                        </div>

                        <Field
                            label="Title"
                            value={form.title}
                            onChange={(v) => setForm({ ...form, title: v })}
                            placeholder="Song Name"
                        />
                        <Field
                            label="Artist"
                            value={form.artist}
                            onChange={(v) => setForm({ ...form, artist: v })}
                            placeholder="Artist Name"
                        />
                        <Field
                            label="Cover URL"
                            value={form.cover_url}
                            onChange={(v) => setForm({ ...form, cover_url: v })}
                            placeholder="https://..."
                        />
                        <Field
                            label="Duration (seconds)"
                            value={form.duration}
                            onChange={(v) => setForm({ ...form, duration: v })}
                            placeholder="For Example: 210"
                            type="number"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={
                                !audioUrl ||
                                !form.title ||
                                !form.artist ||
                                creating
                            }
                            className="w-full mt-2 py-2.5 bg-emerald-500/85 hover:bg-emerald-600/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-400/40 rounded-xl text-white text-sm font-medium transition-all duration-200"
                        >
                            {creating ? "Saving..." : "Save song"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
