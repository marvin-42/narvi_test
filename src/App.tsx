import { Container, Typography } from "@mui/material";

import GitHubUsers from "./views/GitHubUsers";

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>Search Github Users</Typography>
      <GitHubUsers />
    </Container>
  );
}

export default App;
