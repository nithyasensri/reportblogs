
import './App.css';
import Header from './Components/Header';
import AddForm from './Components/AddForm';
import Maindiv from './Maindiv';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SinglePost from './Components/SinglePost';
import EditForm from './Components/EditForm';
import ListUsers from './Components/ListUsers';
import UsersPostlist from './Components/UsersPostlist';


function App() {

  return (
    <div className="App">
      <Router>
       <Header/>
        <Routes>
          <Route path='/' element={<Maindiv />}></Route>
          <Route path='/post/:postId' element={<SinglePost />}></Route>
          <Route path='/list/:userId' element={<UsersPostlist />} ></Route>
          <Route path='/addform' element={<AddForm />} ></Route>
          <Route path='/edit/:postId' element={<EditForm />} ></Route>
          <Route path='/users' element={<ListUsers />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
