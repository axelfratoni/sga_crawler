import React, { Component } from 'react';

import { fetchAllSubjectNamesWithCode } from '../../config/firebase';
import Calendar from '../../shared/Calendar';

import './styles.css';

class Scheduler extends Component {
  state = { subjects: [], toSchedule: [], filter: '' };

  componentDidMount = () => {
    const handleFetchSubjects = subjects => {
      this.setState({ subjects });
    };
    fetchAllSubjectNamesWithCode(handleFetchSubjects);
  };

  getFilteredSubjects = () => {
    const filteredSubjs = this.state.subjects.filter(sub =>
      sub.subj_name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .includes(
          this.state.filter
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
        )
    );
    return filteredSubjs || [];
  };

  handleToggleSubj = subj => () => {
    const size = this.state.toSchedule.length;
    const aux = this.state.toSchedule.filter(s => s.subj_code !== subj.subj_code);
    if (aux.length === size) {
      aux.push(subj);
    }
    this.setState({ toSchedule: aux });
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <div className="scheduler-container">
        <h1>SGA Crawler</h1>
        <Calendar subjects={this.state.toSchedule} />
        <input className="option-filter" onChange={this.handleFilter} placeholder="Buscá una materia" />
        <div className="options-container">
          {this.getFilteredSubjects().map(sub => (
            <button className="option" key={sub.subj_code} onClick={this.handleToggleSubj(sub)}>
              {sub.subj_name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Scheduler;
