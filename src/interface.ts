import { URLSearchParams } from 'url';

export interface IResponse {
    /** error or success. Determines if the request was successful */
    status: 'error' | 'success' | string;
    /** Returned when a successful match was made. null if unable to match */
    result?: IResult | null;
    /** Contains information about the error */
    error?: IError;
    /** Contains a list of parameters you passed. Only displayed when the request fails */
    requested_params?: IParams;
}

export interface IGuess {
    status: 'error' | 'success' | string;
    error?: IError;
    result: IGuessResult | null;
}

interface IGuessResult {
    underground: string;
    humming: boolean;
    count: number;
    list: IGuessItem[];
}

interface IGuessItem {
    score: number;
    artist: string;
    title: string;
}

export interface IData {
    method: 'GET' | 'POST';
    params?: URLSearchParams;
    body?: {
        api_token: string;
        url: string;
    };
    headers?: { [key: string]: any };
    path: string;
}

interface IError {
    /** Error Code */
    error_code: number;
    /** Message detailing why the request failed */
    error_message: string;
}

interface IParams {
    url: string;
    method: string;
}

interface IResult {
    /** Artist name */
    artist: string;
    /** Song title */
    title: string;
    /** Song Album */
    album: string;
    release_date: string;
    label: string;
    timecode: string;
    /** Provides a lis.tn link to find the track across multiple services */
    song_link: string;
    apple_music?: AppleMusic;
    spotify?: Spotify;
}

interface AppleArtwork {
    width: number;
    height: number;
    url: string;
    bgColor: string;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
}

interface ApplePreview {
    url: string;
}

interface AppleMusic {
    previews: ApplePreview[];
    artwork: AppleArtwork;
    artistName: string;
    url: string;
    discNumber: number;
    genreNames: string[];
    durationInMillis: number;
    releaseDate: string;
    name: string;
    isrc: string;
    albumName: string;
    playParams: {
        id: string;
        kind: string;
    };
    trackNumber: number;
    composerName: string;
}

interface Spotify {
    album: SpotifyAlbum;
    artists: Artist[];
    available_markets?: any;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: SpotifyLinks;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    track_number: number;
    type: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface SpotifyAlbum {
    album_type: string;
    artists: Artist[];
    available_markets?: any;
    external_urls: SpotifyLinks;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface SpotifyLinks {
    spotify: string;
}

interface Artist {
    external_urls: SpotifyLinks;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
