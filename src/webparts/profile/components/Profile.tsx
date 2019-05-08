import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";


export default class Profile extends React.Component<IProfileProps, {}> {
  public render(): React.ReactElement<IProfileProps> {
    pnp.sp.web.lists.getByTitle("ProfileList").items.get().then((items: any[]) => {
      console.log(items);
  });
    return (
      
      <div className={ styles.profile }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Profilsida för nyanställda</span>
              <p className={ styles.subTitle }>SESAN</p>
              <p className={ styles.description }>text om personen</p>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
