export interface Country {
    flags:   Flags;
    name:    Name;
    cca3:    string;
    latlng:  number[];
    borders: string[];
}

export interface Flags {
    png: string;
    svg: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}
