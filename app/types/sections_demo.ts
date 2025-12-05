import { Artifact } from "./artifact";

export interface SectionsDemo {
    id: number;
    title: string;
    slug:string;
    parentTitle:string;
    parentSlug:string;
    parentType:string;
    show_in_demo_light : boolean;
    artifacts: Artifact[];
}