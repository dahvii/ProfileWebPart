import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item } from "sp-pnp-js";
import Person from './Person';
import { IPersonaProps, IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    profileListItems: []
  }

  componentDidMount(){
    pnp.sp.web.lists.getByTitle("ProfileList").items.get().then((items: any[]) => {
      this.setState({ profileListItems : items})
      console.log(items);
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
              return <Persona
              text={item.Title}
              secondaryText= {item.CompanyPosition}
              size={PersonaSize.size72}
              imageUrl={item.Image.Url}
            />
            })}  
          </div>
        </div>
      </div>
    );
  }
}
