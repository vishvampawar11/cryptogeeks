import { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const arr = [5, 3, 6, 8, 4, 32];

const sortArr = (arr, param) => {
  if (param === "asc") {
    arr.sort((a1, a2) => a1 < a2 ? 1 : -1);
  } else {
    arr.sort((a1, a2) => a1 > a2 ? 1 : -1);
  }
};

const Demo = () => {
  const [param, setParam] = useState("acs");

  const params = ["asc", "desc"];

  sortArr(arr, param);

  return (
    <div>
      <Select
        placeholder="Sort By"
        defaultValue="asc"
        onChange={(value) => {
          setParam(value);
        }}
      >
        {params.map((param) => (
          <Option key={param}>{param}</Option>
        ))}
      </Select>
      <h2>{arr.map((a) => `${a}, `)}</h2>
    </div>
  );
};

export default Demo;
