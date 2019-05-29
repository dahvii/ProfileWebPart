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
import { Web, PnPClientStorage } from "sp-pnp-js";
import pnp from "sp-pnp-js";

export interface IProfileWebPartProps {
  description: string;
}

export default class ProfileWebPart extends BaseClientSideWebPart<IProfileWebPartProps> {  
  
  componentDidMount(){
    console.log("root  ", location.protocol + "//" + location.hostname + this.context.pageContext.site.serverRelativeUrl);


    pnp.setup({
      sp: {
        baseUrl: location.protocol + "//" + location.hostname + this.context.pageContext.site.serverRelativeUrl
      }
    });
  }

  private getExistingList() {
    return new Promise((resolve: (success?: any) => void, reject: (error: any) => void): void => {
      pnp.sp.web.lists.getByTitle("Newly Hired List").items.get().then((items: any[]) => {
        let list = [];
  
        items.forEach(item => {
          let person = {
            id: item.Id,
            name: item.Title,
            startDate: item.StartDate, 
            imageUrl: (item.Image ? item.Image.Url : null ),
            companyPosition: item.CompanyPosition,
            profileText: item.ProfileText,
          }
          list.push(person)
        });

        resolve(list);
        }, (errorMessage)=> {
          reject(errorMessage)
      });
    })
  }

  public render() {
    //try fetch list
    this.getExistingList().then(existingList => {
      console.log("listan hämtad");
      this.createReactElement(existingList);
    })
    .catch( error => {
      console.log("listan finns ej");
      this.createReactElement();
    })
  }

  private createReactElement(listItems? :[any]){
    const element: React.ReactElement<IProfileProps > = React.createElement(
      Profile,
      {
        description: this.properties.description,
        list: listItems,
        baseUrl: location.protocol + "//" + location.hostname + this.context.pageContext.site.serverRelativeUrl
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
