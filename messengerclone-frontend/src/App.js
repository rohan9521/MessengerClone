import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import ChatRoom from './components/chatRoom/ChatRoom';
import HomePage from './components/homePage/HomePage';
import { Provider } from 'react-redux';
import GlobalStore from './redux/GlobalStore';
import Profile from './components/profile/Profile';
import SearchResults from './components/searchResults/SearchResults';
import Feed from './components/feed/Feed';
import SignUp from './components/signUp/SignUp';

function App() {
  return (
    <Provider store={GlobalStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/feed' Component={Feed} >
            <Route path='/feed/search' Component={SearchResults}/>
            <Route path='/feed/home' Component={HomePage}>
              <Route index Component={ChatRoom} />
              <Route path='/feed/home/profile' Component={Profile} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
