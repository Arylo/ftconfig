export interface IReadFileOptions extends IReadOptions {
    encoding?: BufferEncoding;
}

export interface IWriteOptions extends IReadOptions {
    encoding?: BufferEncoding;
}

export interface IReadOptions {
    type: string;
    path?: string;
}
