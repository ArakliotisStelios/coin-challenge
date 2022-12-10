import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto"; // important, whithout it chart is not working
import { fetchCoinMarketChart } from "../utils/FetchFunctions";
import {
  Box,
  Stack,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const LineChart = ({ coinId }) => {
  const [days, setDays] = useState(1);
  const { data, status } = useQuery(
    ["coinMarketChart", coinId, days],
    fetchCoinMarketChart
  );
  // cast data from API to object set that Line chart can read
  const market_data = { datasets: [{ label: "Market Chart" }], labels: [] };

  market_data.datasets[0].data = data?.prices.map((item) => item[1]);
  market_data.labels = data?.prices.map((item) =>
    new Date(item[0]).toLocaleString()
  );

  const handleChange = (event) => {
    setDays(event.target.value);
    event.stopPropagation();
  };

  if (status === "success") {
    return (
      <>
        <Stack alignItems="end">
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="simple-select-label">Days</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={days}
                label="Days"
                onChange={handleChange}
              >
                <MenuItem value={1}>1 day</MenuItem>
                <MenuItem value={14}>14 days</MenuItem>
                <MenuItem value={30}>1 month</MenuItem>
                <MenuItem value={90}>3 months</MenuItem>
                <MenuItem value={365}>1 year ago </MenuItem>
                <MenuItem value={"max"}>from day 1</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Line data={market_data} />
      </>
    );
  }

  return <div>Please wait while chart is loading</div>;
};

export default LineChart;
