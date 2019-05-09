import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";
import Person from './Person';


export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    profileListItems: []
  }

  componentDidMount(){
    pnp.sp.web.lists.getByTitle("ProfileList").items.get().then((items: any[]) => {
      this.setState({ profileListItems : items})

      }, (errorMessage)=> {
     // Failed
     console.log(errorMessage);
    });

    
  }


  public render(): React.ReactElement<IProfileProps> {
    return ( 
      <div className={ styles.profile }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            {this.state.profileListItems.map(item => {
              return <Person key= {item.Id} name= {item.Title} text ={item.ProfileText}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}
