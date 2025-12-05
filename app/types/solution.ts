import { Case } from "./case";
import { SectionsDemo } from "./sections_demo";

export interface Solution {
    id: number;
    attributes: {
        titlepage: string;
        title: string;
        product_name:string
        subtitle: string;
        locale: string;
        slug: string;
        icon: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        banner_desc: string;
        action_link: string;
        acronym: string;
        cases: {
            data: Case[];
        };

        SEO: {
            id: string,
            title: string,
            description: string,
            opengraph_title: string,
            opengraph_description: string,
            opengraph_image: any,
            robots_index: boolean,
            robots_follow: boolean
        };
        sections_demo: SectionsDemo[],
        localizations: {
            data: {
                id: number;
                attributes: {
                    titlepage: string;
                    title: string;
                    slug: string;
                    locale: string;
                    sections_demo: SectionsDemo[];
                };
            }[];
        };
        
    };
}
