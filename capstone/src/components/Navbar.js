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
    loginIsActive: "",
    registerIsActive: "",
    burgerIsActive: ""
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
          profileIsActive: "is-active",
          loginIsActive: "",
          registerIsActive: ""
        })
        break
      case "DegreePlanner":
        this.setState({
          plannerIsActive: "is-active",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
          loginIsActive: "",
          registerIsActive: ""
        })
        break
      case "ClassSearch":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "is-active",
          requirementsIsActive: "",
          profileIsActive: "",
          loginIsActive: "",
          registerIsActive: ""
        })
        break
      case "DegreeRequirements":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "is-active",
          profileIsActive: "",
          loginIsActive: "",
          registerIsActive: ""
        })
        break
      case "Login":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
          loginIsActive: "is-active",
          registerIsActive: ""
        })
        break
      case "Register":
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
          loginIsActive: "",
          registerIsActive: "is-active"
        })
        break
      default:
        this.setState({
          plannerIsActive: "",
          searchIsActive: "",
          requirementsIsActive: "",
          profileIsActive: "",
          loginIsActive: "",
          registerIsActive: ""
        })
    }
  }

  handleBurger() {
    if (this.state.burgerIsActive === "") {
      this.setState({burgerIsActive: "is-active"})
    }
    else {
      this.setState({burgerIsActive: ""})
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
            <div className={"navbar-burger " + this.state.burgerIsActive} onClick={() => this.handleBurger()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={"navbar-menu " + this.state.burgerIsActive}>
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
                <button className="button is-link is-inverted" onClick={this.handleLogout}>Log Out</button>
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
            <div className={"navbar-burger " + this.state.burgerIsActive} onClick={() => this.handleBurger()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={"navbar-menu " + this.state.burgerIsActive}>
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to="/login">
                  <button className={"button is-link " + this.state.loginIsActive}>
                    Login
                  </button>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/register">
                  <button className={"button is-link " + this.state.registerIsActive}>
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }
}
