import * as React from 'react';
import styles from './Profile.module.scss';
import { IProfileProps } from './IProfileProps';
import PersonList from './PersonList';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import ListHelper from '../ListHelper';


export default class Profile extends React.Component<IProfileProps, {}> {
  state = {
    createdNewList: false,
    listUrl: null,
    profileList: null
  }

  constructor(props) {
    super(props);
    ListHelper.getExistingList(this.props.listChoice).then(existingList => {
      this.setState({ profileList: existingList })
    }, error => {
      console.log(error);
    })
  }

  shouldComponentUpdate(nextProps): boolean {
    if (this.props.listChoice != nextProps.listChoice) {
      ListHelper.getExistingList(nextProps.listChoice).then(existingList => {
        this.setState({profileList: existingList})
      }, error => {
        console.log(error);
      })
    }
    return true;
  }

  public render(): React.ReactElement<IProfileProps> {
    SPComponentLoader.loadCss('//unpkg.com/office-ui-fabric-react/dist/css/fabric.min.css');
    return (
      <div className={styles.profile}>
        <div className={styles.container}>
          <h1>{this.props.description}</h1>
          {this.state.profileList &&
            <PersonList list={this.state.profileList}></PersonList>
          }
          {!this.state.profileList && !this.state.createdNewList &&
            <div>
              <h2>There is no list connected to this app </h2>
              <p>Please fill in the correct name of an existing list in the app settings or click below for creating a new list</p>
              <DefaultButton
                text="Create a list"
                onClick={this.createList}
              />
            </div>
          }
          {this.state.createdNewList &&
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
    ListHelper.createList().then(listUrl => {
      this.setState({ createdNewList: true, listUrl: listUrl })
    }, error => {
      console.log(error);
    })
  }
}
