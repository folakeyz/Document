import { IDocuments } from "./IDocuments";
export class ClassDocuments{
    public Name:string;
    public Title:string;
    public File:string;
   


    constructor(item: IDocuments){
        this.Name = item.Name;
        this.Title = item.Title;
        this.File = item.File;
       
    }
}