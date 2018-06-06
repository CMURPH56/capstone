import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';
import { getPath } from '../config/api';
import Modal from 'react-responsive-modal';
import Popup from 'reactjs-popup';

export default class DegreePlanner extends Component {
  constructor() {
    super();
    this.state = {
      degree: "Computer Science",
      concentration: "Software and Systems Development",
      numCourses: "1",
      modalLoading: "",
      path: {},
      open: false
    }
    this.COURSES = {
      "Artificial Intelligence": 1,
      "Business Analysis/Systems Analysis": 2,
      "Business Intelligence": 3,
      "Database Administration": 4,
      "Database Systems": 5,
      "Data Science": 6,
      "Game and Real-Time Systems": 7,
      "Human-Computer Interaction": 8,
      "IT Enterprise Management": 9,
      "Software and Systems Development": 10,
      "Software Engineering": 11,
      "Standard": 12,
      "Theory": 13
    }
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  degreeChanged = (e) => {
    this.setState({degree: e.target.value});
  }

  numCoursesChanged = (e) => {
    this.setState({numCourses: e.target.value})
  }

  concentrationChanged = (e) => {
    this.setState({concentration: e.target.value});
  }

  onOpenModal = () => {
    this.setState({modalLoading: "is-loading"})
    
    const concentration = this.COURSES[this.state.concentration]
    getPath(concentration, this.state.numCourses)
    .then(courses => {
      this.setState({
        path: courses,
        modalLoading: "",
        open: true
      })
    })
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };


  render(){
    const { path } = this.state
    const pathList = Array.prototype.map.call(path, (obj, i) => {
      return(
        <div key={i} style={{float: "left", clear: "right", width: "100%"}}>
          <h2 style={{clear: "right", textAlign: "center"}}>Quarter {i+1}</h2>
          <hr/>
          {Array.prototype.map.call(path[i], (object, idx) => {
            return(
              Object.entries(object).map((course, cidx) => {
                return(
                  <div key={cidx} style={{float: "left", padding: "25px"}}>
                    <Popup trigger={<button className="button is-link is-rounded"> {course[0]} </button>}
                      modal
                      closeOnDocumentClick>
                      <div>
                        <h1>{course[0]}</h1>
                        <h1>{course[1].CourseName}</h1>
                        <hr/>
                        <p>{course[1].Description}</p>
                        <p>{course[1].Prereq}</p>
                      </div>
                    </Popup>
                  </div>
                )
              })
            )
          })}
        </div>
      )
    })
    if (this.context.store.getState().user){
      return(
        <div>
          <Navbar store={this.context.store} active="DegreePlanner"/>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Degree Planner
              </h1>
            </div>
            <div className="is-divider" />
            <div className="columns">
              <div className="column">
                <div className="container is-fluid">
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Degree</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                      <div className="select is-medium is-link is-rounded">
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
                          <div className="select is-medium is-link is-rounded">
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
                  <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label is-medium"># Courses per Quarter</label>
                    </div>
                     <div className="field-body">
                        <div className="control">
                          <div className="select is-medium is-link is-rounded">
                            <select value={this.state.numCourses} onChange={this.numCoursesChanged}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                     </div>
                  </div>
                    <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label is-medium"></label>
                      </div>
                      <div className="field-body">
                        <div className="control">
                          <button className={"button is-link is-rounded " + this.state.modalLoading} onClick={this.onOpenModal}>Search</button>
                          <Modal open={this.state.open} onClose={this.onCloseModal} classNames={{modal: 'custom-modal' }}>
                            <div style={{float: "left"}}>
                              {pathList}
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            
             
            </div>
          </section>

        </div>
      )
    }
    return <Redirect to="/login"/>
  }
}
