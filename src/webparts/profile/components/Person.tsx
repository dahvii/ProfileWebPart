import * as React from 'react';
import styles from './Profile.module.scss';
import { IPersonProps } from './IPersonProps';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Moment from 'react-moment';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Link } from 'office-ui-fabric-react/lib/Link';

export class Person extends React.Component<IPersonProps> {

  state = {
    isCollapsed: true
  }

    public render() { 
        const  _onRenderSecondaryText = (props): JSX.Element => {
            return (
              <div>
                <Icon iconName={'Suitcase'} className={'ms-JobIconExample'} />
                {props.secondaryText}
                <br/>
                  Starts at <Moment format="ddd YY-MM-DD" >{props.optionalText}</Moment>
              </div>
            );
          };
        const  toggle = (props) => {
          this.setState({
            isCollapsed: !this.state.isCollapsed
          })
        };
      
        return (   
        <div>
          <div className={ styles.row }>
              <Persona
                  className={ styles.persona }
                  text={this.props.person.name}
                  size={PersonaSize.size72}
                  secondaryText= {this.props.person.companyPosition}
                  onRenderSecondaryText={_onRenderSecondaryText}
                  imageUrl={this.props.person.imageUrl}
                  optionalText= {this.props.person.startDate}
              />      
              <div className={ styles.introText }>
              <Link onClick={toggle} style={{ color: 'rgb(102, 102, 102)' }}> 
                <TooltipHost content={this.state.isCollapsed ? "Show Introduction Text":  "Hide Introduction Text"}>
                  <Icon iconName={'ContactInfo'} className={ styles.icon } />
                  <p>{this.props.person.profileText.substr(0, 50)+"..."}</p>
                </TooltipHost>
              </Link>
              </div>
          </div>
          <div >
          {!this.state.isCollapsed && <div className={ styles.row }>{this.props.person.profileText}</div> } 
          </div>
        </div>
        );
    }
}

export default Person; 
