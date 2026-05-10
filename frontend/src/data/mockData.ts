import type { Album, Artist, Track } from "../types/media";

export const artists: Artist[] = [
    { id: "a1", name: "Aurora Lane", image: "https://picsum.photos/300?1" },
    { id: "a2", name: "Neon Rivers", image: "https://picsum.photos/300?2" },
];

export const albums: Album[] = [
    {
        id: "al1",
        title: "Midnight Echoes",
        artist: "Aurora Lane",
        image: "https://picsum.photos/400?3",
    },
    {
        id: "al2",
        title: "City Lights",
        artist: "Neon Rivers",
        image: "https://picsum.photos/400?4",
    },
];

export const tracks: Track[] = [
    {
        id: "t1",
        title: "Fading Horizon",
        artist: "Aurora Lane",
        album: "Midnight Echoes",
        image: "https://picsum.photos/400?5",
        duration: 212,
    },
    {
        id: "t2",
        title: "Electric Heart",
        artist: "Neon Rivers",
        album: "City Lights",
        image: "https://picsum.photos/400?6",
        duration: 185,
    },
];
