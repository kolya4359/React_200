import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

class floatingPopulationListChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseFPList: "",
      append_FPList: "",
    };
  }

  componentDidMount = async () => {
    axios
      .get("http://3.35.120.155:5000/users", {})
      .then((response) => {
        try {
          this.setState({ responseFPList: response });
          this.setState({
            append_FPList: this.state.responseFPList.data.entry,
          });
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
        return false;
      });
  };

  render() {
    return (
      <LineChart
        width={1000}
        height={300}
        data={this.state.append_FPList}
        margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="군구" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="유동인구수" stroke="#8884d8" />
      </LineChart>
    );
  }
}

export default floatingPopulationListChart;
