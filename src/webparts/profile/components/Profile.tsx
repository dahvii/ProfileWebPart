import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import PersonList from './PersonList';
import { SPComponentLoader } from '@microsoft/sp-loader';
import pnp from "sp-pnp-js";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    createdNewList: false,
    listUrl: null
  }
  constructor(props){
    super(props)    
    pnp.setup({
      sp: {
        baseUrl: props.baseUrl
      }
    });

  }


  public render(): React.ReactElement<IProfileProps> {      
    SPComponentLoader.loadCss('//unpkg.com/office-ui-fabric-react/dist/css/fabric.min.css');    
    return ( 
      <div className={ styles.profile }>
        <div className={ styles.container}>
            <h1>{this.props.description}</h1>
            {this.props.list  && 
              <PersonList list= {this.props.list}></PersonList> 
            }
            {!this.props.list  && !this.state.createdNewList &&
              <div>
                <h2>There is no list connected to this app </h2> 
                <p>Please fill in the correct name of an existing list in the app settings or click below for creating a new list</p>
                <DefaultButton
                  text="Create a list"
                  onClick={this.createList}
                />
              </div>
            }
            {this.state.createdNewList  && 
              <div>
                <h2> The list is created!</h2> 
                <p>Now head over to "Newly Hired List" and fill in your new employee and get this app up and running!</p>
                <DefaultButton
                  href={this.state.listUrl}
                  text="Take me to the list"
                  
                />
              </div>
            }
        </div>
      </div>
    );
  }

  @autobind
  private createList(): void {
    let web= pnp.sp.web;
    let listTitle = "Newly Hired List"; 
    let listDescription = "A list for the Newly Hired App"; 
    let listTemplateId = 100; 
    let enableContentTypes = true; 

    var _self=this;
    web.lists.add(listTitle, listDescription,listTemplateId, enableContentTypes).then(function(splist){      
     web.lists.getByTitle(listTitle).fields.addMultilineText("ProfileText").then(f => {
      splist.list.defaultView.fields.add("ProfileText");
      web.lists.getByTitle(listTitle).fields.addUrl("Image").then(f => {
        splist.list.defaultView.fields.add("Image");
        web.lists.getByTitle(listTitle).fields.addText("CompanyPosition", 25, {Required: true}).then(f => {
          splist.list.defaultView.fields.add("CompanyPosition");
          web.lists.getByTitle(listTitle).fields.addDateTime("StartDate", undefined, undefined, undefined, {Required: true}).then(f => {
            splist.list.defaultView.fields.add("StartDate");
          });
        });
      });   
    }); 
    
    web.lists.getByTitle(listTitle).expand('RootFolder, ParentWeb').select('RootFolder/ServerRelativeUrl').get().then(function(result) {
      _self.setState({listUrl: location.protocol + "//" + location.hostname  + result.RootFolder.ServerRelativeUrl})
    });
   
      _self.setState({createdNewList: true})

    }).catch(function (error){
      console.log(error);
      
    });
  }

}
