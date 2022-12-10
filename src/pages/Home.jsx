import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Stack,
  Paper,
  Skeleton,
  Pagination
} from "@mui/material";
import { fetchCoins } from "../utils/FetchFunctions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const coinsPerPage = 10;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, status } = useQuery(["coins", page, coinsPerPage], fetchCoins);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handelClickCoin = (coin) => {
    navigate(`/coins/${coin.id}`);
  };
  return (
    <>
      <Paper elevation={3} sx={{ margin: 4, textAlign: "center" }}>
        {status === "errors" && <p>Error fetching data</p>}
        {status === "loading" && <Skeleton height={600}></Skeleton>}
        {status === "success" && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell variant="head">Name</TableCell>
                <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Current price</TableCell>
                <TableCell align="right">Lowest price (24 hours)</TableCell>
                <TableCell align="right">Highest price (24 hours)</TableCell>
                <TableCell align="right">Price change (24 hours)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((coin) => (
                <TableRow
                  key={coin.id}
                  sx={{
                    "&:hover": {
                      background: "#e0e0e0",
                      cursor: "pointer",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={() => handelClickCoin(coin)}
                >
                  <TableCell component="th" scope="row">
                    {coin.name}
                  </TableCell>
                  <TableCell align="right">{coin.symbol}</TableCell>
                  <TableCell align="right">{coin.current_price}</TableCell>
                  <TableCell align="right">{coin.low_24h}</TableCell>
                  <TableCell align="right">{coin.high_24h}</TableCell>
                  <TableCell align="right">
                    {coin.price_change_percentage_24h + "%"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Stack alignItems="end" marginRight={4}>
        <Pagination
          count={10}
          showLastButton={false}
          onChange={handleChange}
          variant="outlined"
        />
      </Stack>
    </>
  );
}

export default Home;
