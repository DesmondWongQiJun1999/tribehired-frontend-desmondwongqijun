
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Post from "./CommentManager/Post/Post";
import Comment from "./CommentManager/Comments/Comment";
  
function App() {
    
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Post/>}/>
        <Route exact path="/comment" element={<Comment/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}
  
export default App;