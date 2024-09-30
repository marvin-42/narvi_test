import { useState } from "react";

import Box from "@mui/material/Box";

import SearchForm, { FormValues } from "../components/SearchForm";
import Users from "../components/Users";

export default function GitHubUsers() {
  const [query, setQuery] = useState("");

  const handleSearchFormSubmit = (values: FormValues) => setQuery(values.query);

  return (
    <Box sx={{ m: 2, width: "100%" }}>
      <SearchForm initialValue={query} onSubmit={handleSearchFormSubmit} />
      <Box sx={{ mt: 2 }}>
        <Users query={query} />
      </Box>
    </Box>
  );
}
