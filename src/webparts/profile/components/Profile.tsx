import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import pnp from "sp-pnp-js";
import PersonList from './PersonList';
import { SPComponentLoader } from '@microsoft/sp-loader';


export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    profileListItems: []
  }
  
  constructor(props){
    super(props);

    pnp.setup({
      sp: {
        baseUrl: location.protocol + "//" + location.hostname + "/sites/LIADevSite"
      }
    });

    pnp.sp.web.lists.getByTitle("ProfileList").items.get().then((items: any[]) => {
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

      this.setState({ profileListItems : list})
      }, (errorMessage)=> {
     // Failed
     console.log(errorMessage);
    });
    
  }

  public render(): React.ReactElement<IProfileProps> {
    SPComponentLoader.loadCss('//unpkg.com/office-ui-fabric-react/dist/css/fabric.min.css');
    return ( 
      <div className={ styles.profile }>
        <div className={ styles.container}>
            <h1>{this.props.description}</h1>
            <PersonList list= {this.state.profileListItems}></PersonList> 
        </div>
      </div>
    );
  }
}
