import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route, Switch} from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PokemonListPage from './pages/pokedex/PokemonListPage';
import PostFeedPage from './pages/posts/PostFeedPage';
import PostDetailPage from './pages/posts/PostDetailPage';
import PostEditForm from './pages/posts/PostEditForm';
import { useCurrentUser } from './contexts/CurrentUserContext';
import HomePage from './pages/home/HomePage';
import PokemonBuildCreateForm from './pages/posts/PokemonBuildCreateForm';

function App() {
  const currentUser = useCurrentUser();
  
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          
          <Route exact path="/signin" render={() =>  <SignInForm/>} />
          <Route exact path="/signup" render={() =>  <SignUpForm />} />
          <Route exact path="/pokedex/:page" render={() =>  <PokemonListPage />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/create/build" render={() => <PokemonBuildCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostDetailPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts" render={() => <PostFeedPage />} />
        </Switch>
      </div>

    </div>
  );
}

export default App;