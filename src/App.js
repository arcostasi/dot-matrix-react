import React from 'react';
import queryString from 'query-string';
import './App.css';

class LedMatrix extends React.Component {
  render() {
    return (
      <div id="led-matrix">
        {
          this.props.LedData.map((row, index) => <LedRow row={row} key={index} />)
        }
      </div>
    )
  }
}

class LedRow extends React.Component {
  render() {
    return <div className="led-row">
      {
        this.props.row.map((led, index) => {
          return <Led led={led} key={index} />
        })
      }
    </div>
  }
}

class Led extends React.Component {
  render() {
    const { led } = this.props;
    const active = (led.r > 0 || led.g > 0 || led.b > 0) ? true : false;
    const rgba = `rgba(${led.r}, ${led.g}, ${led.b}, 1.0)`;

    if (active) {
      return (
        <div className="led">
          <div className="color" style={{ color: rgba }}></div>
        </div>
      )
    }
    else {
      return <div className="led"></div>
    }
  }
}

class App extends React.Component {
  state = { LedData: this.createLedDataBuffer({ rows: 16, cols: 16 }) }

  render() {
    return <LedMatrix LedData={this.state.LedData} />
  }

  createLedDataBuffer(props) {
    const params = queryString.parse(window.location.search);

    let rows = props.rows;
    let cols = props.cols;

    if ((params.rows) && (parseInt(params.rows) > 0)) {
        rows = parseInt(params.rows);
    }

    if ((params.cols) && (parseInt(params.cols) > 0)) {
        cols = parseInt(params.cols);
    }

    const data = Array(rows).fill(0).map(
      _ => Array(cols).fill(0).map(
        _ => ({ r: 0, g: 0, b: 0 })
      )
    );

    return data;
  }

  componentDidMount() {
    // Workaround for a Wokwi sometimes missing the first message
    let listener = setInterval(() => {
      // eslint-disable-next-line no-restricted-globals
      parent.postMessage(
        { app: "wokwi", command: "listen", version: 1 },
        "https://wokwi.com"
      );
    }, 100);

    window.addEventListener("message", ({ data }) => {
      if (data.neopixels) {
        this.setState(state => {
          return { LedData: this.updateLedData(data.neopixels, state.LedData) };
        });
        if (listener) {
          clearInterval(listener);
          listener = null;
        }
      }
    });
  }

  updateLedData(NeoPixelsData, LedData) {
    const width = LedData[0].length;
    const height = LedData.length;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {

        const grb = NeoPixelsData[(row * width) + col];

        let r = (grb >> 8) & 0xff;
        let g = (grb >> 16) & 0xff;
        let b = grb & 0xff;

        LedData[row][col] = { r: r, g: g, b: b };
      }
    }

    return LedData;
  }
}

export default App;
