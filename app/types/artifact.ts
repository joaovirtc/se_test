export interface Artifact {
   id:number;
        title:string;
        slug:string;
        show_in_demo_light:boolean;
        parentTitle:string;
        parentSlug:string;
        parentType:string;
        sectionSlug: string;
        mime:string;
        media:{
            data: {
                attributes: {
                    url: string;
                    mime:string;
                    alternativeText:string;
                    caption:string;
                };
            }[];
        }
        guideflow_id:string;
        youtube_id:string;
}