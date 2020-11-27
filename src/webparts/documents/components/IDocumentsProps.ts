import { WebPartContext } from "@microsoft/sp-webpart-base"; 
export interface IDocumentsProps {
  description: string;
  Name: string;
  Title: string;
  File: string;
  context:WebPartContext; 
}
