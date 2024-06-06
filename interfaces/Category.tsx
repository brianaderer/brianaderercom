export interface Category {
    rght: number;
    treeId: number;
    name: string;
    level: number;
    lft: number;
    id: string;
    parent: Category | null;
    children: Category[];
}