export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export interface Event {
    name: string;
    date: string;
    type: string;
}

export interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    organization: string;
    role: string;
}

export interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}