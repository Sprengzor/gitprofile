import React, { Component } from "react";

import "./styles.css";


export default class Form extends Component {
  state = {
    repos: [],
    profile: [],
    username: "Sprengzor"
  };

  async componentDidMount() {
    const profResponse = await fetch(
      `https://api.github.com/users/${this.state.username}`
    );
    const profile = await profResponse.json();
    const reposResponse = await fetch(
      `https://api.github.com/users/${this.state.username}/repos`
    );
    const repos = await reposResponse.json();
    this.setState({ repos, profile });
  }

  inputChangeHandler = (e) => {
    const username = e.target.value;
    this.setState = ({username});
  }

  render() {
    console.log(this.state.username);
    const repos = this.state.repos;
    const profile = this.state.profile;
    let hireable = null;
    if (profile.hireable === null) {
      hireable = <p>Não Informado</p>
    }else if(profile.hireable) {
      hireable = <p>Sim</p>
    }else {
      hireable = <p>Não</p>
    }

    return (
      <div>
        <div id="navbar">
          <h1>GitProfile</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="GitHub Username ..."
              value={this.state.username}
              onChange = {this.inputChangeHandler}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div id="mainContent">
          <div id="profContent">
            <h1>Profile</h1>
            <img src={profile.avatar_url} alt="profile_avatar"/>
            <p><b>Nome: </b></p>
            {profile.name}
            <p><b>Login: </b></p>
            {profile.login}
            <p><b>Empresa: </b></p>
            {profile.company}
            <p><b>Localização: </b></p>
            {profile.location}
            <p><b>Disponibilidade para contrato: </b></p>
            {hireable}
          </div>
          <div id="reposContent">
            <h1>Repositories</h1>
            <ul>
              {repos.map(repo => {
                return (
                  <li key={repo.id}>
                    <strong>{repo.name}</strong>
                    <a href={repo.html_url} alt={repo.name}>
                      {repo.html_url}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
