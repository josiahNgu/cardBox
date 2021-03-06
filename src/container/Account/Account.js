import React, { Component } from "react";
import { connect } from "react-redux";
import AccountSideBar from "../../components/Account/AccountSideBar/AccountSideBar";
import AccountInfo from "../../components/Account/AccountInfo/AccountInfo";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import "./Account.css";
class Account extends Component {
  componentDidMount() {
    if (localStorage.getItem("idToken")) {
      this.props.getUserData();
    } else {
      window.location.reload();
    }
  }

  logout = () => {
    localStorage.removeItem("idToken");
    window.location.reload();
  };
  render() {
    let userData = <Spinner />;
    if (this.props.user) {
      userData = {
        userName: this.props.user.data.userData.displayName,
        email: this.props.user.data.userData.email
      };
    }
    return (
      <div className="">
        <div className="account_container pt_4">
          <section className="sidebar">
            <AccountSideBar />
          </section>
          <aside className="main_info">
            <AccountInfo userInfo={userData} /> <br />
          </aside>
          <button className="PrimaryButton" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(actions.getAuthenticatedUserData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
