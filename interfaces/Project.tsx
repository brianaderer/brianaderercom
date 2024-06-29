import {Technology} from "@/interfaces";

export interface Project {
    name: string,
    url: URL,
    description: string,
    technologies: Technology[],
    featured: boolean,
}