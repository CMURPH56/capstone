import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';

export default class DegreeRequirements extends Component {
  constructor() {
    super();
    this.state = {
      degree: "Computer Science",
      concentration: "Software and Systems Development",
      updating: false,
      updateLoading: ""
    }
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  degreeChanged = (e) => {
    this.setState({degree: e.target.value});
  }

  concentrationChanged = (e) => {
    this.setState({concentration: e.target.value});
  }



  render(){
    if (this.context.store.getState().user){
      return(
        <div>
          <Navbar store={this.context.store} active="DegreeRequirements"/>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Degree Requirements
              </h1>
            </div>
<<<<<<< HEAD
          </section>
        <section className="section">
          <div className="columns">
              <div className="column">
                <div className="container is-fluid">
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Degree</label>
                    </div>
                    <div className="field-body">
                    <div className="control">
                        <div className="select is-medium is-info is-rounded">
                          <select value={this.state.degree} onChange={this.degreeChanged}>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Information Systems">Information Systems</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Concentration</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <div className="select is-medium is-info is-rounded">
                        {
                          this.state.degree !== "Information Systems" ?
                          <select value={this.state.concentration} onChange={this.concentrationChanged}>
                            <option value="Software and Systems Development">Software and Systems Development</option>
                            <option value="Theory">Theory</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Database Systems">Database Systems</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Game and Real-Time Systems">Game and Real-Time Systems</option>
                            <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                          </select>
                          :
                          <select value={this.state.concentration} onChange={this.concentrationChanged}>
                            <option value="Business Analysis/Systems Analysis">Business Analysis/Systems Analysis</option>
                            <option value="Business Intelligence">Business Intelligence</option>
                            <option value="Database Administration">Database Administration</option>
                            <option value="IT Enterprise Management">IT Enterprise Management</option>
                            <option value="Standard">Standard</option>
                          </select>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </div>


      );
=======
            <div className="is-divider" />
          </section>
        </div>
      )
>>>>>>> 1e4497e9e85c23d54a7dd9f3543780fb43ee3638
    }
    return <Redirect to="/login"/>
  }
}
