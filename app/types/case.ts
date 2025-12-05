export interface PaginationMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface Case {
    id: number;
    attributes: {
        featured: boolean;
        title: string;
        slug: string;
        locale: string;
        short_desc: string;
        characterer_before: string;
        number: number;
        characterer_after: string;
        content: string;
        success: boolean;
        show_in_demo_only:boolean
        icon: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    url: string;
                };
            };
        };
        testimony_desc: string;
        testimony_agent: string;
        testimony_agent_attribution: string;
        testimony_image: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    url: string;
                };
            };
        };
        share_button_label: string;
        card_one_title: string;
        card_one_desc: string;
        card_two_title: string;
        card_two_desc: string;
        card_three_title: string;
        card_three_desc: string;
        who_title: string;
        who_desc: string;
        who_image: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    url: string;
                };
            };
        };
        file: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    url: string;
                };
            };
        };
        video: string;
        subcategories: {
            data:CaseSubCategory[];
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
    };
}

export interface CaseSubCategory {
  id: number;
  attributes: {
    code: string;
    name: string;
    locale: string;
    slug: string;
  };
}

export interface CaseCategory {
  id: number;
  attributes: {
    code: string;
    name: string;
    subcategories: {
      data: CaseSubCategory[];
    };
  };
}

export interface CaseApiResponse {
    data: Case[];
    meta: PaginationMeta;
}
