import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

class floatingPopulationScatterChart extends Component {
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
      <ScatterChart
        width={1000}
        height={300}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="연령대(10세단위)"
          name="연령대"
          unit="세"
        />
        <YAxis type="number" dataKey="유동인구수" name="유동인구수" unit="명" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={this.state.append_FPList} fill="#003458" />
      </ScatterChart>
    );
  }
}

export default floatingPopulationScatterChart;
