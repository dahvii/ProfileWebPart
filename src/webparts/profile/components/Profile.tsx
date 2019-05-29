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
    createdNewList: false
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

  
    //create fields 
    web.fields.addMultilineText("Profile Text").then(f => {
      console.log(f);

  });
    web.fields.addUrl("Image").then(f => {

      console.log(f);
  });
    web.fields.addText("Company Position", 25).then(f => {

      console.log(f);
  });
    web.fields.addDateTime("Start Date").then(f => {

      console.log(f);
  })


    //format: add(title: string, description?: string, template?: number, enableContentTypes?: boolean, additionalSettings?: TypedHash<string | number | boolean>): Promise<ListAddResult>;
    var _self=this;
    web.lists.add(listTitle, listDescription,listTemplateId, enableContentTypes).then(function(splist){
     /* web.lists.getByTitle(listTitle).fields.addMultilineText("Profile Text").then(f => {

        console.log(f);
    });
      web.lists.getByTitle(listTitle).fields.addUrl("Image").then(f => {
  
        console.log(f);
    });
      web.lists.getByTitle(listTitle).fields.addText("Company Position", 25).then(f => {
  
        console.log(f);
    });
      web.lists.getByTitle(listTitle).fields.addDateTime("Start Date").then(f => {
  
        console.log(f);
    })*/
      _self.setState({createdNewList: true})
    }).catch(function (error){
      console.log(error);
      
    });

   // this.createFields(listTitle);
    /*if(this.state.createdNewList){
      this.createFields("Newly Hired List");
    }
*/
  }

  @autobind
  private createFields(listTitle): void {
    console.log("i createfields");
    /*
    let web= pnp.sp.web;

    web.lists.getByTitle(listTitle).fields.addMultilineText("Profile Text").then(f => {

      console.log(f);
  });
    web.lists.getByTitle(listTitle).fields.addUrl("Image").then(f => {

      console.log(f);
  });
    web.lists.getByTitle(listTitle).fields.addText("Company Position", 25).then(f => {

      console.log(f);
  });
    web.lists.getByTitle(listTitle).fields.addDateTime("Start Date").then(f => {

      console.log(f);
  });*/
  }

}
