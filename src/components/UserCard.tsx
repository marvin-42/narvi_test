import { Avatar, Box, Typography } from "@mui/material";

import { User } from "../types";

// I used type not interface here to use type alias
type UserCardProps = Omit<User, "id">;

export default function UserCard({ avatarUrl, username }: UserCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        my: 2,
        p: 1,
        alignItems: "center",
        bgcolor: "whitesmoke",
      }}
    >
      <Avatar alt={username} src={avatarUrl} sx={{ mr: 2 }} />
      <Typography component="h4">{username}</Typography>
    </Box>
  );
}
