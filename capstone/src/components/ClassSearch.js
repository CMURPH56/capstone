import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';
import './DegreeRequirement.css';
import Popup from 'reactjs-popup';
import Modal from 'react-responsive-modal';
import { searchCourses } from '../config/api';

export default class ClassSearch extends Component {
  constructor() {
    super();
    this.state = {
      courseType: "Any",
      courseNum: "",
      modalLoading: "",
      open: false,
      error: "",
      searchResults: {}
    }
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  courseTypeChanged = (e) => {
    this.setState({courseType: e.target.value});
  }

  courseNumChanged = (e) => {
    this.setState({courseNum: e.target.value});
  }

  onOpenModal = () => {
    this.setState({modalLoading: "is-loading", searchResults: {}})

    var prefix = this.state.courseType
    if (prefix === "Any") {
      prefix = ""
    }
    const query = prefix + ' ' + this.state.courseNum

    searchCourses(query)
    .then(courses => 
      this.setState({
        searchResults: courses,
        modalLoading: "",
        open: true,
        error: ""
    }))
    .catch(error => 
      this.setState({
        modalLoading: "",
        error: "Please enter a search term!"   
      }))
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render(){
    const { open } = this.state;
    const searchResultsList = Object.entries(this.state.searchResults).map((obj, idx) => {
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
          <Navbar store={this.context.store} active="ClassSearch"/>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Class Search
              </h1>
            </div>
          <div className="is-divider" />
            <div className="columns">
               <div className="column">
                 <div className="container is-fluid">
                  <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label is-medium">Course Type</label>
                      </div>
                      <div className="field-body">
                        <div className="control">
                          <div className="select is-medium is-link is-rounded">
                            <select value={this.state.courseType} onChange={this.courseTypeChanged}>
                              <option value="Any">Any</option>
                              <option value="CSC">Computer Science</option>
                              <option value="SE">Software Engineering</option>
                              <option value="IS">Information Systems</option>
                              <option value="GAM">Game Development</option>
                              <option value="IT">Information Technology</option>
                              <option value="HCI">Human-Computer Interaction</option>
                              <option value="GEO">Geographic Information Systems</option>
                              <option value="CNS">Computer, Information and Network Security</option>
                              <option value="ECT">E-Commerce Technology</option>
                              <option value="GPH">Computer Graphics and Motion Technology</option>
                              <option value="TDC">Telecommunications</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                     <div className="field-label">
                      <label className="label is-medium">Course Number</label>
                      </div>
                     <div className="field-body">
                      <div className="control">
                        <input className="input is-medium is-link is-rounded" type="text" value={this.state.courseNum} onChange={this.courseNumChanged}/>
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
                          <Modal open={open} onClose={this.onCloseModal} classNames={{modal: 'custom-modal' }}>
                            <div style={{float: "left", width: "100%"}}>
                              <h2 style={{textAlign: "center"}}>Search Results</h2>
                              <hr/>
                              {
                                searchResultsList.length === 0 &&
                                <h3>No Results Found</h3>
                              }
                              {searchResultsList}
                            </div>
                          </Modal>
                          {
                            this.state.error &&
                            <p className="help is-danger">Error: {this.state.error}</p>
                          }
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
