import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GetWeatherDetails } from "../redux/Actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
    this.state = {
        hidebox: true
      };
  }

  componentDidMount() {
    const { GetWeatherDetails } = this.props.action;
    GetWeatherDetails();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState(({ hidebox }) => ({ hidebox: !hidebox }));
    const { searchInput } = this.state;
    const { GetWeatherDetails } = this.props.action;
    if (searchInput) GetWeatherDetails(this.state.searchInput);
    this.setState({ searchInput: "" });
  };
  handleclose = e => {
    this.setState(({ hidebox }) => ({ hidebox: !hidebox }));
  };
  handleOnChange = e => {
    this.setState({
      searchInput: e.target.value
    });
  };
  render() {
    const { data, success } = this.props.weatherData;
    const { weather, sys, name, main } = data;
    const { searchInput } = this.state;

    return (
      <>
        <div className="container">
          <div className="heading">Weather Finder</div>

          { this.state.hidebox ? 
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Please enter City"
              value={searchInput}
              onChange={e => this.handleOnChange(e)}
            />
            <button>Find</button>
          </form>
          :
          <>
          <button
          className="close-button"
          onClick={this.handleclose}
            >
            close
          </button>
          <div className="info">
            <div className="sub-heading">
              Weather Forecast <div>on</div>
            </div>
            <small className="date">
              {success ? moment().format("MMM DD YYYY") : null}
            </small>
            <div className="location">
              {success ? name : null}
              <small>({success ? sys.country : null})</small>
            </div>
            <div className="forecast-info">
              <div className="forecast-icon">
                {success ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt=""
                  />
                ) : null}
              </div>
              <div className="forecast-value">
                <div className="degrees">
                  <span className="degrees-count">
                    {success ? main.temp : null}
                  </span>
                  C
                </div>
                <span className="weather-condition">
                  {success ? weather[0].main : null}
                </span>
              </div>
            </div>
            <div className="additional-info">
              <ul className="list">
                <li>
                  <b>Feels Like</b> {success ? main.feels_like : null}
                </li>
                <li>
                  <b>Min Temp</b> {success ? main.temp_min : null}
                </li>
                <li>
                  <b>Max Temp</b> {success ? main.temp_max : null}
                </li>
                <li>
                  <b>Pressure</b> {success ? main.pressure : null}
                </li>
                <li>
                  <b>Humidity</b> {success ? main.humidity : null}
                </li>
              </ul>
            </div>
          
          
          
          
          </div>
          </>
}
        </div>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  weatherData: state
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ GetWeatherDetails }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
