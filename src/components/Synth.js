import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Oscillator from './Oscillator';
import Noise from './Noise';
import { Col, Row } from 'react-bootstrap';
import style from '../styles/Synth.css'

class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  handleChangeEvent(event) {
    console.log("slider change")
    switch(event.target.id) {
      case "activeInstrument":
        browserHistory.push(`/drum-punch/edit/${event.target.value}`);
        break;
      case "play":
        this.props.playInstrument(this.props.params.index);
        break;
      case "level":
        this.props.updateLevel(this.props.params.index, event.target.value);
    }
  }

  render() {
    var active = parseInt(this.props.params.index);
    return (
      <div className="synth">
        <Row>
          <select id="activeInstrument" defaultValue={active} onChange={this.handleChangeEvent.bind(this)}>
            {this.props.instruments.map((instrument, i) => 
                <option key={i} value={i}>{instrument.name}</option>
            )}
          </select>

          <button id="play" onClick={this.handleChangeEvent.bind(this)}> 🔊 </button>
          <br />
          <br />
          <label htmlFor="level">Volume</label>
            <input type="range" step="0.01" min="0" max="1" id="level"
              defaultValue={this.props.instruments[active].config.level} 
              onChange={this.handleChangeEvent.bind(this)} 
              className="mainVolume"
              />
        </Row>
          <Row><Col sm={6}><Oscillator {...this.props} /></Col>
          <Col sm={6}><Noise {...this.props} /></Col></Row>
      </div>
    )
  }
}

export default Synth