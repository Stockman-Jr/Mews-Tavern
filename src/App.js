import styles from './App.module.css';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PokeDexPage from './pages/pokedex/PokeDexPage';
import PostFeedPage from './pages/posts/PostFeedPage';
import PostEditForm from './pages/posts/PostEditForm';
import HomePage from './pages/home/HomePage';
import PokemonBuildCreateForm from './pages/posts/PokemonBuildCreateForm';
import DetailPage from './pages/posts/DetailPage';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import UserAccountForm from './pages/auth/UserAccountForm';

function App() {
  
  return (
    <div className={styles.App}>
      <NavBar />
      <div >
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          
          <Route exact path="/signin" render={() =>  <SignInForm/>} />
          <Route exact path="/signup" render={() =>  <SignUpForm />} />
          <Route exact path="/pokedex/:page" render={() =>  <PokeDexPage />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/create/build" render={() => <PokemonBuildCreateForm />} />
          <Route exact path="/posts/:id" render={() => <DetailPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts" render={() => <PostFeedPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id/edit/account" render={() => <UserAccountForm />} />
        </Switch>
      </div>

    </div>
  );
}

export default App;