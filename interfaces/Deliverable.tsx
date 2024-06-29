import {Technology} from "@/interfaces/Technology";

export interface Deliverable {
    description: string,
    id: number,
    name: string,
    technologies: Technology[],
}