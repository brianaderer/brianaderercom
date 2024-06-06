import {Category, Contact, Technology, Headline} from "@/interfaces";

export interface HomeProps {
    contacts: Contact[];
    categories: Category[];
    technologies: Technology[];
    headlines: Headline[];
}