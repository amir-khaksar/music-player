export interface Artist {
    id: string;
    name: string;
    image: string;
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    image: string;
}

export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    image: string;
    duration: number;
}
