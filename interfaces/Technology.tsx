export interface Technology {
    rght?: number;
    treeId?: number;
    name?: string;
    level?: number;
    lft?: number;
    id: string;
    parent: Technology | null;
    children: Technology[];
}