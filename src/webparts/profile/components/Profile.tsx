import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import pnp from "sp-pnp-js";
import PersonList from './PersonList';


export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    profileListItems: []
  }
  
  componentDidMount(){
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
    return ( 
      <div className={ styles.profile }>
        <div className={ styles.container}>
            <h1>Newly Hired</h1>
            <PersonList list= {this.state.profileListItems}></PersonList> 
        </div>
      </div>
    );
  }
}
