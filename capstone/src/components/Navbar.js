import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../helpers/auth';
import { logoutUser } from '../actions'
import { Link } from 'react-router-dom';
import logo from '../assets/dpu_logo_tour.png'

export default class Navbar extends Component {
  state = {
    plannerIsActive: "",
    searchIsActive: "",
    requirementsIsActive: "",
    profileIsActive: "",
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    })
  }

  handleLogout = async() => {
    await logout(this.context.store);
    // Redirect to login
    this.props.store.dispatch(logoutUser())
    this.context.router.history.push('/login')
  }

  componentDidMount(){
    this.setActiveNav()
  }

  setActiveNav = () => {
    switch(this.props.active) {
      case "Profile":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "is-inverted",
        })
        break
      case "DegreePlanner":
        this.setState({
          plannerIsActive: "is-inverted",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
        })
        break
      case "ClassSearch":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "is-inverted",
          requirementsIsActive: "",
          profileIsActive: "",
        })
        break
      case "DegreeRequirements":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "is-inverted",
          profileIsActive: "",
        })
        break
      default:
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
        })
    }
  }

  render () {
    if (this.props.store.getState().user){
      return (
        <nav className="navbar is-link" aria-label="main navigation">
          <div className="navbar-brand">
            <div className= "navbar-item">
              <Link to="/degree_planner">
                <button className="button is-link is-inverted">
                  <img src={logo} alt="DePaul University" />
                </button>
              </Link>
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to="/degree_planner">
                  <button className={"button is-link " + this.state.plannerIsActive}>
                    Degree Planner
                  </button>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/class_search">
                  <button className={"button is-link " + this.state.searchIsActive}>
                    Class Search
                  </button>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/degree_requirements">
                  <button className={"button is-link " + this.state.requirementsIsActive}>
                    Degree Requirements
                  </button>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/profile">
                  <button className={"button is-link " + this.state.profileIsActive}>
                    Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-link" onClick={this.handleLogout}>Log Out</button>
              </div>
            </div>
          </div>
        </nav>
      );
    }
    else {
      return (
        <nav className="navbar is-link" aria-label="main navigation">
          <div className="navbar-brand">
            <div className= "navbar-item">
              <Link to="/login">
                <button className="button is-link is-inverted">
                  <img src={logo} alt="DePaul University" />
                </button>
              </Link>
            </div>
          </div>
        </nav>
      );
    }
  }
}
