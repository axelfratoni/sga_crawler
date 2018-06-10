import React, { Component } from 'react';

import { fetchAllSubjectNamesWithCode } from '../../config/firebase';
import Calendar from '../../shared/Calendar';

import SubjectDetail from './componets/SubjectDetail';
import './styles.css';

class Scheduler extends Component {
  state = { subjects: [], toSchedule: [], filter: '', showingInfo: null };

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

  handleShowInfo = subject => () => {
    this.setState({ showingInfo: subject });
  };

  isSubjectSelected = subject => this.state.toSchedule.find(sub => subject.subj_code === sub.subj_code);

  render() {
    return (
      <div className="scheduler-container">
        <h1>SGA Crawler</h1>
        <Calendar subjects={this.state.toSchedule} handleShowInfo={this.handleShowInfo} />
        <input className="option-filter" onChange={this.handleFilter} placeholder="Buscá una materia" />
        <div className="subjects-info-container">
          <div className="options-container">
            {this.getFilteredSubjects().map(sub => (
              <button
                className={`option ${this.isSubjectSelected(sub) ? 'selected' : ''}`}
                key={sub.subj_code}
                onClick={this.handleToggleSubj(sub)}
              >
                {sub.subj_name}
              </button>
            ))}
          </div>
          <div className="subject-detail">
            <SubjectDetail subject={this.state.showingInfo} />
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
