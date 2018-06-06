import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';
import Popup from 'reactjs-popup';
import Modal from 'react-responsive-modal';
import './DegreeRequirement.css';
import { getDegreeRequirements } from '../config/api';



export default class DegreeRequirements extends Component {
  constructor() {
    super();
    this.state = {
      degree: "Computer Science",
      concentration: "Software and Systems Development",
      search: false,
      updating: false,
      modalLoading: "",
      open: false,
      reqCourses: {},
      concentrationCourses: {}
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

  concentrationChanged = (e) => {
    this.setState({concentration: e.target.value});
  }

  onOpenModal = () => {
    this.setState({modalLoading: "is-loading"})
    if (this.state.degree === "Computer Science") {
      getDegreeRequirements(0)
      .then(courses => this.setState({reqCourses: courses}))
    }
    else {
      this.setState({reqCourses: {}})
    }
    
    const concentration = this.COURSES[this.state.concentration]
    getDegreeRequirements(concentration)
    .then(courses => 
      this.setState({
        concentrationCourses: courses,
        modalLoading: "",
        open: true
    }))
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };



  render(){
    const { open } = this.state;
    const reqClassList = Object.entries(this.state.reqCourses).map((obj, idx) => {
      var clear = "none"
      if (idx === Object.keys(this.state.reqCourses).length - 1){
         clear = "right"
      }
      return (
        <div key={idx} style={{float: "left", padding: "25px", clear: clear}}>
          <Popup trigger={<button className="button is-link is-rounded"> {obj[0]} </button>}
          modal
          closeOnDocumentClick>
          <div>
            <h1>{obj[0]}</h1>
            <h1>{obj[1].CourseName}</h1>
            <hr/>
            <p>{obj[1].Description}</p>
            <p>{obj[1].Prereq}</p>
          </div>
          </Popup>
        </div>
      )
    });
    const concentrationClassList = Object.entries(this.state.concentrationCourses).map((obj, idx) => {
      return (
        <div key={idx} style={{float: "left", padding: "25px"}}>
          <Popup trigger={<button className="button is-link is-rounded"> {obj[0]} </button>}
          modal
          closeOnDocumentClick>
          <div>
            <h1>{obj[0]}</h1>
            <h1>{obj[1].CourseName}</h1>
            <hr/>
            <p>{obj[1].Description}</p>
            <p>{obj[1].Prereq}</p>
          </div>
          </Popup>
        </div>
      )
    });
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
          <div className="is-divider"/>
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
                  <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label is-medium"></label>
                      </div>
                      <div className="field-body">
                        <div className="control">
                          <button className={"button is-link is-rounded "+ this.state.modalLoading} onClick={this.onOpenModal}> Search </button>
                          <Modal open={open} onClose={this.onCloseModal} classNames={{modal: 'custom-modal' }}>
                            {
                              this.state.degree === "Computer Science" &&
                              <div style={{float: "left"}}>
                                <h2 style={{textAlign: "center"}}>Required Courses</h2>
                                <hr/>
                                {reqClassList}
                            </div>
                            }
                            <div style={{float: "left"}}>
                              <h2 style={{textAlign: "center"}}>Concentration Courses</h2>
                              <hr/>
                              {concentrationClassList}
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


      );
    }
    return <Redirect to="/login"/>
  }
}
