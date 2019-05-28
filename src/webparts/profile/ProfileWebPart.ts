import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ProfileWebPartStrings';
import Profile from './components/Profile';
import { IProfileProps } from './components/IProfileProps';
import { Web } from "sp-pnp-js";


export interface IProfileWebPartProps {
  description: string;
}

export default class ProfileWebPart extends BaseClientSideWebPart<IProfileWebPartProps> {
 
  private CreateList(): void {
    let spWeb = new Web(this.context.pageContext.web.absoluteUrl);
    let spListTitle = "SPFxPnPList"; 
    let spListDescription = "SPFxPnP List"; 
    let spListTemplateId = 100; 
    let spEnableCT = false; 

    spWeb.lists.add(spListTitle, spListDescription,spListTemplateId, spEnableCT).then(function(splist){
             
      console.log("lista skapad");
    }).catch(function (error){
      console.log(error);
      
    });
  }

  public render(): void {
    //try fetch list
    //if not existing, create list
    this.CreateList();

    const element: React.ReactElement<IProfileProps > = React.createElement(
      Profile,
      {
        description: this.properties.description
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
