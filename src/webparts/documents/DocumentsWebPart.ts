import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DocumentsWebPartStrings';
import Documents from './components/Documents';
import { IDocumentsProps } from './components/IDocumentsProps';

export interface IDocumentsWebPartProps {
  description: string;
  Name: string;
  Title: string;
  File: string;
}

export default class DocumentsWebPart extends BaseClientSideWebPart<IDocumentsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDocumentsProps> = React.createElement(
      Documents,
      {
        description: this.properties.description,
        Name: this.properties.Name,
        Title: this.properties.Title,
        File: this.properties.File,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
