import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../utils/FetchFunctions";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LineChart from "../components/LineChart";

function CoinDetails() {
  let { coinId } = useParams();
  const { data, status } = useQuery(["coinDetails", coinId], fetchCoinDetails);
  const navigate = useNavigate();

  const handelClickBack = (coin) => {
    navigate(`/`);
  };

  return (
    <>
      <Box margin={4}>
        <Button onClick={handelClickBack}>Go back to coins</Button>
      </Box>
      {!status === "success" ? (
        <Box margin={4}>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            {"Please wait..."}
          </Typography>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ margin: 4, textAlign: "center" }}>
          <Card sx={{ padding: 4 }}>
            <CardContent>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                {data?.name}
              </Typography>
              <Grid container spacing={2}>
                {data?.description.en && (
                  <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      {data?.description.en}
                    </Typography>
                  </Grid>
                )}
                {data?.market_data.current_price.usd && (
                  <Grid item xs={12}>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="h6"
                      color="text.secondary"
                    >
                      {"Current price (usd) "}
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        {data?.market_data.current_price.usd}
                      </Typography>
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Socia media statistics"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.community_data.facebook_likes &&
                      " Facebook likes: " + data?.community_data.facebook_likes}
                    {data?.community_data.twitter_followers &&
                      " Twitter followers: " +
                        data?.community_data.twitter_followers}
                    {data?.community_data.reddit_subscribers &&
                      " Reddit Subscribers: " +
                        data?.community_data.reddit_subscribers}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Price change"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.market_data.price_change_percentage_24h &&
                      " 24 hours: " +
                        data?.market_data.price_change_percentage_24h +
                        "%"}
                    {data?.market_data.price_change_percentage_7d &&
                      " 7 days: " +
                        data?.market_data.price_change_percentage_7d +
                        "%"}
                    {data?.market_data.price_change_percentage_14d &&
                      " 14 days: " +
                        data?.market_data.price_change_percentage_14d +
                        "%"}
                    {data?.market_data.price_change_percentage_30d &&
                      " 1 month: " +
                        data?.market_data.price_change_percentage_30d +
                        "%"}
                    {data?.market_data.price_change_percentage_60d &&
                      " 2 months: " +
                        data?.market_data.price_change_percentage_60d +
                        "%"}
                    {data?.market_data.price_change_percentage_200d &&
                      "200 days: " +
                        data?.market_data.price_change_percentage_200d +
                        "%"}
                    {data?.market_data.price_change_percentage_1y &&
                      "1 year: " +
                        data?.market_data.price_change_percentage_1y +
                        "%"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Limits of the year"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.market_data.ath.usd &&
                      " Highest of the year: " +
                        data?.market_data.ath.usd +
                        " on " +
                        new Date(
                          data?.market_data.ath_date.usd
                        ).toLocaleDateString("en-US")}
                    {data?.market_data.atl.usd &&
                      " Lowest of the year: " +
                        data?.market_data.atl.usd +
                        " on " +
                        new Date(
                          data?.market_data.atl_date.usd
                        ).toLocaleDateString("en-US")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Limits of the day"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.market_data.high_24h.usd &&
                      " Highest of the day: " + data?.market_data.high_24h.usd}
                    {data?.market_data.low_24h.usd &&
                      " Lowest of the day: " + data?.market_data.low_24h.usd}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Github statistics"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.developer_data.forks &&
                      " Forks: " + data?.developer_data.forks}
                    {data?.developer_data.stars &&
                      " Stars: " + data?.developer_data.stars}
                    {data?.developer_data.subscribers &&
                      " Subscribers: " + data?.developer_data.subscribers}
                    {data?.developer_data.total_issues &&
                      " Issues: " + data?.developer_data.total_issues}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Reputation score"}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    {data?.sentiment_votes_up_percentage &&
                      " Up votes: " + data?.sentiment_votes_up_percentage + "%"}
                    {data?.sentiment_votes_down_percentage &&
                      " Down votes: " +
                        data?.sentiment_votes_down_percentage +
                        "%"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Contact links"}{" "}
                  </Typography>
                  {data?.links.homepage[0] && (
                    <a target="blank" href={data?.links.homepage[0]}>
                      {data?.links.homepage[0]}
                      <br />
                    </a>
                  )}
                  {data?.links.official_forum_url[0] && (
                    <a target="blank" href={data?.links.official_forum_url[0]}>
                      {data?.links.official_forum_url[0]}
                      <br />
                    </a>
                  )}
                  {data?.links.blockchain_site[0] && (
                    <a target="blank" href={data?.links.blockchain_site[0]}>
                      {data?.links.blockchain_site[0]}
                      <br />
                    </a>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ mb: 1 }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {"Social media links"}{" "}
                  </Typography>
                  {data?.links.facebook_username && (
                    <a
                      target="blank"
                      href={`https://facebook.com/${data?.links.facebook_username}`}
                    >
                      {`https://facebook.com/${data?.links.facebook_username}`}
                      <br />
                    </a>
                  )}
                  {data?.links.twitter_screen_name && (
                    <a
                      target="blank"
                      href={`https://twitter.com/${data?.links.twitter_screen_name}`}
                    >
                      {`https://twitter.com/${data?.links.twitter_screen_name}`}
                      <br />
                    </a>
                  )}
                </Grid>
              </Grid>
              <LineChart coinId={coinId} />
            </CardContent>
          </Card>
        </Paper>
      )}
    </>
  );
}

export default CoinDetails;
