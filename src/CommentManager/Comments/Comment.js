import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router";

const Comment = () => {
  const location = useLocation();
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  let url = `https://jsonplaceholder.typicode.com/comments?postId=${location?.state?.postID}`

  let url2 = `https://jsonplaceholder.typicode.com/posts/${location?.state?.postID}`

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(out =>
        setComments(Array.from(out))
      )
      .catch(err => { throw err });
  }, [url])

  useEffect(() => {
    fetch(url2)
      .then(res => res.json())
      .then(out =>
        setPost(out)
      )
      .catch(err => { throw err });
  }, [url2])

  useEffect(() => {
    if (searchText?.length > 0) {
      fetch(url)
        .then(res => res.json())
        .then(out =>
          (Array.from(out))
        ).then(unfiltered =>

          setComments(unfiltered?.filter(x =>
            x.name?.toLowerCase()?.includes(searchText.toLowerCase()) || x.body?.toLowerCase()?.includes(searchText.toLowerCase()) || x.email?.toLowerCase()?.includes(searchText.toLowerCase())
          ))
        )
        .catch(err => { throw err });

    } else {
      fetch(url)
        .then(res => res.json())
        .then(out =>
          setComments(Array.from(out))
        )
        .catch(err => { throw err });
    }

  }, [searchText])


  console.log(post)

  return (
    <>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "orange",
            color: 'black'
          }}
        >
          <IconButton
            onClick={() => {
              console.log('onClick');
              navigate('/')
            }}
          >
            <KeyboardArrowLeftIcon

            />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {location?.state?.title}
          </Typography>

          <TextField
            id="standard-search"
            label="Search comments..."
            type="search"
            variant="standard"
            onChange={(e) =>
              setSearchText(e?.target?.value)
            }
            style={{
              position: "absolute",
              right: "2%",
              top: "2%"
            }}
          />
        </Toolbar>
      </AppBar>

      <Typography
        variant="h6"
        component="div"
        align='center'
        style={{
          fontSize: "25px",
          marginTop: "50px",
          overflowY: "scroll",
          overflowX: "hidden"
        }}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {post?.body}
      </Typography>

      <List style={{ marginTop: "40px" }}>
        <Divider />
        {comments?.map((v, index) => (
          <>
            <ListItem alignItems="flex-start" key={v?.id}>
              <ListItemText
                primary={v?.body}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    style={{ fontSize: "12px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {
                      `Commented by: ${v?.name}`
                    }
                    <div></div>
                    {
                      `Commenter email: ${v?.email}`
                    }
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </>

        ))}
      </List>
    </>
  );
};

export default Comment;