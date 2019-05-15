import * as React from 'react';
import styles from './Profile.module.scss';
import { IPersonProps } from './IPersonProps';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Moment from 'react-moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Link } from 'office-ui-fabric-react/lib/Link';





library.add(faInfoCircle)


export class Person extends React.Component<IPersonProps> {
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

        let intro= this.props.person.profileText.substr(0, 50)+"...";
        const  toggle = (props): JSX.Element => {
          console.log(props);
          
          return (
            <div>
              TEST
              
            </div>
          );
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
              <Link onClick={toggle}> 
                <div className={ styles.icon }>
                  <TooltipHost content="Show Introduction Text">
                    <Icon iconName={'ContactInfo'}  />
                  </TooltipHost>
                </div>
                <p>{intro}</p>
              </Link>
              </div>
          </div>
          <div className={ styles.row }>
            <p>{this.props.person.profileText}</p>
          </div>
        </div>
        );
    }
}

export default Person; 
