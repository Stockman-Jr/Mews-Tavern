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

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() =>  <SignInForm/>} />
          <Route exact path="/signup" render={() =>  <SignUpForm />} />
          <Route exact path="/pokedex" render={() =>  <PokemonListPage />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/create/build" render={() => <h1>Pokémon build</h1>} />
          <Route exact path="/posts" render={() => <PostFeedPage />} />
        </Switch>
      </Container>

    </div>
  );
}

export default App;