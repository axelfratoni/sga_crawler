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
        <div className="options-container">
          <input className="option-filter" onChange={this.handleFilter} />
          {this.state.subjects
            .filter(sub => sub.subj_name.toUpperCase().includes(this.state.filter.toUpperCase()))
            .map(sub => (
              <button className="option" key={sub.subj_code} onClick={this.handleToggleSubj(sub)}>
                <p>{sub.subj_name}</p>
              </button>
            ))}
        </div>
      </div>
    );
  }
}

export default Scheduler;
