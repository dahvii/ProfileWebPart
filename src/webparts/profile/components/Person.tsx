import * as React from 'react';
import styles from './Profile.module.scss';
import { IPersonProps } from './IPersonProps';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Moment from 'react-moment';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


export class Person extends React.Component<IPersonProps> {

  state = {
    isCollapsed: true
  }

    public render() { 
        const  _onRenderSecondaryText = (props): JSX.Element => {
            return (
              <div>
                <Icon iconName={'Suitcase'} />
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
          <div className={styles.grid}  >          
            <Link  className={styles.row} onClick={toggle} style={{ color: 'rgb(102, 102, 102)' }}>
              {this.props.containerWidth > 420 && 
              <div>
                <div className= {styles.box1}>
                  <Persona
                    text={this.props.person.name}
                    size={PersonaSize.size72}
                    secondaryText= {this.props.person.companyPosition}
                    onRenderSecondaryText={_onRenderSecondaryText}
                    imageUrl={this.props.person.imageUrl}
                    optionalText= {this.props.person.startDate}
                  /> 
                </div>

                <div className={styles.box2}>
                  <TooltipHost content={this.state.isCollapsed ? "Show Introduction Text":  "Hide Introduction Text"}>
                    <Icon iconName={'ContactInfo'} className={ styles.icon } />
                    <p>{this.props.person.profileText? this.props.person.profileText.substr(0, 50)+"...": ''}</p>
                  </TooltipHost>
                </div>
              </div>
              } 

              {this.props.containerWidth <= 420 && 
                <div className= {styles.smallBox}>
                  <Persona
                    size={PersonaSize.large}
                    imageUrl={this.props.person.imageUrl}
                  /> 
                  <div className={styles.name}>{this.props.person.name}</div>
                  <div><Icon iconName={'Suitcase'} className={styles.companyPosition}/> <span className={styles.companyPosition}>{this.props.person.companyPosition}</span></div>
                  <div>Starts at <Moment format="YY-MM-DD" >{this.props.person.startDate}</Moment></div>
                  <div><Icon iconName={'ContactInfo'} className={ styles.icon }/>{this.state.isCollapsed ? "Show Introduction Text":  "Hide Introduction Text"}</div>           
                </div>
              }
            </Link>
         

          <div >
            {!this.state.isCollapsed && 
              <div className={ styles.row }>
                <p>{this.props.person.profileText}</p>
                <DefaultButton
                  text="Hide Introduction Text"
                  onClick={toggle}
                />
              </div>
            } 
          </div>
        </div>
        );
    }
}

export default Person; 
