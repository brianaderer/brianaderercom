import {Deliverable} from "@/interfaces/Deliverable";

export interface Job {
    description: string,
    endDate: string,
    deliverables: Deliverable[],
    name: string,
    startDate: string,
    title: string,
}