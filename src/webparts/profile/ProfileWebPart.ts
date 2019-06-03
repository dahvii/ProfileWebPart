import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneLabel, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import Profile from './components/Profile';
import { IProfileProps } from './components/IProfileProps';
import ListHelper from './ListHelper'

export interface IProfileWebPartProps {
  description: string;
  listChoice: string;
}

export default class ProfileWebPart extends BaseClientSideWebPart<IProfileWebPartProps> {  
  listOptions : any[];
  listInfo= "If you want to connect a new list for the app the list needs 3 required fields who has the static names: 'CompanyPosition', 'StartDate', 'Title'";

  constructor(props) {
    super();
    this.listOptions= ListHelper.getListNames();
  }

  public render() {
    const element: React.ReactElement<IProfileProps > = React.createElement(
      Profile,
      {
        description: this.properties.description,
        listChoice: this.properties.listChoice,
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
          groups: [
            {
              groupName: "Settings for the app",
              groupFields: [
                PropertyPaneDropdown('listChoice', {
                  label: "Choose a list to get the information from",
                  options: this.listOptions
                }),
                PropertyPaneTextField('description', {
                  label: "Header for the app"
                }),
                PropertyPaneLabel('info', {
                  text: this.listInfo
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
