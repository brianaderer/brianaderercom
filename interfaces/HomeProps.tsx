import {Technology, Contact, Headline, MenuItem, Job, Project} from "@/interfaces";

export interface HomeProps {
    contacts: Contact[];
    technologies: Technology[];
    headlines: Headline[];
    menu: MenuItem[];
    jobs: Job[];
    projects: Project[];
}