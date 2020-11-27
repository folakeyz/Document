import * as React from 'react';
import styles from './Documents.module.scss';
import { IDocumentsProps } from './IDocumentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassDocuments } from './ClassDocuments';
import { IDocuments } from './IDocuments';
import { Web } from "sp-pnp-js";
import DescriptionIcon from '@material-ui/icons/Description';

export default class Documents extends React.Component<IDocumentsProps, any> {
  public constructor(props:IDocumentsProps,any)
  {  
      super(props);
      this.state={
          items:[]
      }
      }
  public render(): React.ReactElement<IDocumentsProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <div className={ styles.documents }>
        <div className={ styles.header }>
        <div className={ styles.grid }>
        <div className={ styles.hcard }>
          <h1><DescriptionIcon />Documents</h1>
          </div>
          <div className={ styles.hcard }  style={{paddingTop: "1rem"}}>
          <a href="https://lotusbetaanalytics.sharepoint.com/sales/Shared%20Documents/Forms/AllItems.aspx" className={styles.btn}>View All</a>
        </div>
          </div>
        </div>

        {
        this.state.items.map(function(item:IDocuments){
    return(
      <div className={ styles.card }>
         <div className={ styles.grids}>
         <div className={ styles.card } style={{paddingTop: "1rem"}}>
         <DescriptionIcon  fontSize="large"/>
           </div>
           <div className={ styles.card }>
           <h3>{item.File['Name']}</h3>
       <small>{item.File['TimeCreated']}</small><br />
       </div>
       <div className={ styles.card } style={{paddingTop: "1rem"}}>
       <a href={item.File['LinkingUri']} className={styles.btns}>Preview</a><br /><br />
       <a href={item.File['LinkingUrl']} className={styles.download}>Download</a>
           </div>
      </div>
      </div>       
 ) 
})

} 
      </div>
    );
  }
  public componentDidMount()
  {
      
      // debugger;
      this._NewsList();
  }
  private _NewsList():void
  {
  
   
  let web = new Web(this.props.context.pageContext.web.absoluteUrl);  
  web.lists.getByTitle(`Documents`).items.select('File').expand('File').get().then
  
      ((response)=>{
          let NewsCollection=response.map(item=> new ClassDocuments(item)).reverse();
          let NewsCard = NewsCollection.slice(0, 5)
          this.setState({items:NewsCard});
      }
  
      )
  }

}
