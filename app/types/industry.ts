import { Case } from "./case";
import { SectionsDemo } from "./sections_demo";

export interface Industry {
    id: number;
    attributes: {
        titlepage: string;
        title: string;
        subtitle: string;
        menu_description:string
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
        banner_video_link: string;
        cases: {
            data: Case[];
        };
        industry_menu_image : {
            data : {
                attributes : {
                    url : string
                }
            }
        }

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

