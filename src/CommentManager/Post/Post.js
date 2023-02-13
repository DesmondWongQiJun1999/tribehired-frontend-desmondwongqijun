import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Post() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  let url = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(out =>
        setPosts(Array.from(out))
      )
      .catch(err => { throw err });
  }, [url])

  return (
    <>
      <AppBar position="static">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: "space-between",
            backgroundColor: "orange",
            color: 'black'
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Posts
          </Typography>
        </Toolbar>
      </AppBar>

      <List>
        {posts?.map((v, index) => (
          <>
            <ListItem alignItems="flex-start" key={v?.id}>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      fontSize: "25px",
                    }}>{v?.title}</Typography>
                }
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    style={{
                      fontSize: "12px",
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {
                      (v?.body.substr(0, 150) + "...")
                    }
                  </Typography>
                }
              />
              <IconButton
                onClick={() => {
                  console.log('onClick');
                  navigate('/comment', { state: { postID: v?.id, title: v?.title } })
                }}
                style={{
                  position: 'absolute', left: '97%', top: '25%',
                }}>
                <KeyboardArrowRightIcon
                />
              </IconButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}

export default Post;