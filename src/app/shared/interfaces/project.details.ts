export interface ProjectDetails {
    id:number;
    id_project:number;
    images: Image[];
    description : {
        es:string;
        en:string;
    }
}

export interface Image {
    id:number;
    url:string;
    isLoading:boolean;
}

export interface OtherProject {
    id:number,
    name:string,
    video:string,
    description : {
        es:string;
        en:string;
    }
}