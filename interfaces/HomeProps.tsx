import {Technology, Contact, Headline, MenuItem, Job} from "@/interfaces";

export interface HomeProps {
    contacts: Contact[];
    technologies: Technology[];
    headlines: Headline[];
    menu: MenuItem[];
    jobs: Job[];
}