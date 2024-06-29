import {Category, Contact, Technology, Headline, MenuItem} from "@/interfaces";

export interface HomeProps {
    contacts: Contact[];
    categories: Category[];
    technologies: Technology[];
    headlines: Headline[];
    menu: MenuItem[];
}