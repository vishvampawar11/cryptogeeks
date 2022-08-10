import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = (props) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < props.coinHistory?.data?.history?.length; i++) {
    coinPrice.push(props.coinHistory.data.history[i].price);
    coinTimeStamp.push(
      new Date(props.coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {props.coinName}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {`${props.coinHistory?.data?.change}%`}
          </Title>
          <Title level={5} className="current-price">
            {`Current ${props.coinName} Price: \$${props.currentPrice}`}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
