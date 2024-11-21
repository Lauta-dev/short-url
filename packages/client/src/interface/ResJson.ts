export interface Re {
    code:    number;
    results: Results;
    short:   string;
}

export interface Results {
    date:         string;
    reportStatus: string;
    harmless:     Harmless;
    undetected:   Harmless;
    suspicious:   Harmless;
    malicious:    Harmless;
}

export interface Harmless {
    engineName: string[];
    stats:      number;
}

