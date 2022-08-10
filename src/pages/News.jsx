import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl =
  "https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/news-94.png";

const News = (props) => {
  const { data } = useGetCryptosQuery(100);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = props.simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (!cryptoNews?.value) {
    return "Loading...";
  }

  return (
    <Row gutter={[24, 24]}>
      {!props.simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a currency"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.chlidren.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferror">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name.length > 50
                    ? `${news.name.substring(0, 50)}...`
                    : news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                  style={{ maxHeight: "200px", maxWidth: "100px" }}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
