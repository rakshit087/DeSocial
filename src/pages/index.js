import { Box, Fab } from "@mui/material";
import Head from "next/head";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Post } from "../components/Post";
import { MakePost } from "../layouts/MakePost";
import { useRecoilState } from "recoil";
import { statusAtom } from "../utilities/atoms";
import { Web3Service } from "../services/Web3Service";
import { UserNotConnected } from "../components/UserNotConnected";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useRecoilState(statusAtom);
  useEffect(() => {
    console.log(status)
    if (status.currentStatus === "Connected") {
      Web3Service.getLatestPosts(page).then((post) => {
        setPosts(post);
        console.log(post);
      });
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Kue</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status.currentStatus === "Connected" ? (
          <Box
            sx={{
              px: { xs: "1.5rem", sm: "10rem", md: "6.5rem", lg: "13.5rem" },
              my: { xs: 5, md: 10 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MakePost open={open} setOpen={setOpen} />
            {posts && posts.map((post) => <Post key={post.id} post={post} />)}
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "absolute",
                bottom: { xs: "1rem", md: "2rem" },
                right: {
                  xs: "1.5rem",
                  sm: "10rem",
                  md: "6.5rem",
                  lg: "13.5rem",
                },
              }}
              onClick={() => setOpen(true)}
            >
              <AddIcon />
            </Fab>
          </Box>
        ) : (
          <Box
            sx={{
              py: 15,
            }}
          >
            <UserNotConnected message={status.message} />
          </Box>
        )}
      </main>
    </div>
  );
}
