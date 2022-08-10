import { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Select, Typography } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Option } = Select;
const { Title } = Typography;

const sortCryptos = (cryptos, param) => {
  if (param === "Rank") {
    cryptos.sort((crypto1, crypto2) =>
      parseInt(crypto1.rank) > parseInt(crypto2.rank) ? 1 : -1
    );
  } else if (param === "Price") {
    cryptos.sort((crypto1, crypto2) =>
      parseInt(crypto1.price) < parseInt(crypto2.price) ? 1 : -1
    );
  } else if (param === "Market Cap") {
    cryptos.sort((crypto1, crypto2) =>
      parseInt(crypto1.marketCap) < parseInt(crypto2.marketCap) ? 1 : -1
    );
  }
};

const Cryptocurrencies = (props) => {
  const count = props.simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const filters = ["Rank", "Price", "Market Cap"];

  useEffect(() => {
    const filteredData = data?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [data, searchTerm]);

  if (isFetching) {
    return "Loading...";
  }

  sortCryptos(cryptos, filterTerm);

  return (
    <>
      <div className="search-crypto">
        {!props.simplified && (
          <Row>
            <Col>
              <Input
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col style={{"display": "flex", "justifyContent": "space-around", "alignItems": "center", "height": "50px"}}>
              <span>Sort By</span>
              <Select
                style={{ width: "100px" }}
                placeholder="Sort By"
                defaultValue="Rank"
                onChange={(value) => {
                  setFilterTerm(value);
                }}
              >
                {filters.map((filter) => (
                  <Option key={filter}>{filter}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        )}
      </div>
      <Row gutter={[28, 28]} className="crypto-card-container">
        {cryptos?.map((crypto, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${i + 1}. ${crypto.name}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                hoverable
              >
                <p>
                  Price: <b>${millify(crypto.price)}</b>
                </p>
                <p>
                  Market Cap: <b>${millify(crypto.marketCap)}</b>
                </p>
                <p>
                  Daily Change: <b>{millify(crypto.change)}%</b>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
