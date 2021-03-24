import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import $ from 'jquery';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import Index from './index.js'
import './App.css';

/**
 * situs ini memiliki 3 halaman, yang semuanya dirender secara dinamis di browser.
 * meskipun halaman tidak pernah di-refresh, perhatikan bagaimana React Router membuat URL
 * selalu terbarui saat anda menavigasi situs.
 * ini menjaga riwayat browser, memastikan hal-hal seperti tombol kembali dan bookmark 
 * berfungsi dengan baik
 * 
 */

// export default function BasicExample(){
//   return(
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">about</Link>
//           </li>
//           <li>
//             <Link to="dashboard">Dashboard</Link>
//           </li>
//         </ul>
//         <hr/>
//         <Switch>
//           <Route exact path="/">
//             <Home/>
//           </Route>
//           <Route exact path="/about">
//             <About/>
//           </Route>
//           <Route exact path="/dashboard">
//             <Dashboard/>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )
// }

// function Home(){
//   return(
//     <div>
//       <h2>Home</h2>
//     </div>
//   )
// }
// function About(){
//   return(
//     <div>
//       <h2>About</h2>
//     </div>
//   )
// }
// function Dashboard(){
//   return(
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   )
// }

// Param adalah placeholdder di URL yang dimulai dengan titik DataCue,
// seperti param ': id' yang didefinisikan dalam route dalam contoh ini.
// export default function ParamsExample(){
//   return(
//     <Router>
//       <div>
//         <h2>Accounts</h2>
//         <ul>
//           <li>
//             <Link to="/netflix">Netflix</Link>
//           </li>
//           <li>
//             <Link to="/gmail">Gmail</Link>
//           </li>
//           <li>
//             <Link to="/yahoo">Yahoo</Link>
//           </li>
//           <li>
//             <Link to="/amazon">Amazon</Link>
//           </li>
//         </ul>
//         <Switch>
//           <Route path="/:id" children={<Child />}/>
//         </Switch>
//       </div>
//     </Router>
//   )
// }

// function Child() {
//   let { id } = useParams();
//   return(
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   )
// }

// karena route adalah komponen regular react,
// sehingga dapat ditampilkan di mana saja dalam penempatannya,
// termasuk dalam child Element

// ini akan membantu anda untuk memecah menjadi beberapa bundel
// karena pemisahan kode pada aplikasi React Router sama dengan 
// pemisahan kode pada aplikasi react lainnya.

// export default function NextingExample(){
//   return(
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>
//         <hr/>
//         <Switch>
//           <Route exact path="/">
//             <Home/>
//           </Route>
//           <Route path="/topics">
//             <Topics/>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )
// }
// function Home(){
//   return(
//     <div>
//       <h2>Home</h2>
//     </div>
//   )
// }
// function Topics(){
// // 'path' untuk membuat jalur <Route> yang terhadap rute induk.
// // sedangkan 'url' untuk membuat link.
//   let{path,url} = useRouteMatch();
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${url}/Sate, Nasi goreng`}>Kuliner</Link>
//         </li>
//         <li>
//           <Link to={`${url}/Wisata alam, Museum`}>Travelling</Link>
//         </li>
//         <li>
//           <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
//         </li>
//       </ul>
//       <Switch>
//         <Route exact path={path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//         <Route path={`${path}/:topicId`}>
//           <Topic/>
//         </Route>
//       </Switch>
//     </div>
//   )
// }

// function Topic(){
//   let { topicId } = useParams();
//   return (
//     <div>
//       <h3>{topicId}</h3>
//     </div>
//   );
// }

export default function AuthExample(){
  return(
    <Router>
      <div>
        <AuthButton/>
            <Link to="/public">Become a Guest</Link>
            <br/>
            <Link to="/private">Member Login</Link>
        <Switch>
          <Route path="/public">
            <PublicPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <PrivateRoute path="/private">
            <ProtectedPage/>
            <Insane />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>

  )
}

let fakeAuth ={
  isAuthenticated: false,
  authenticate(cb){
    fakeAuth.isAuthenticated = true;
    console.log(this.isAuthenticated)
    setTimeout(cb, 100);
  },
  signout(cb){
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton(){
  let history = useHistory();
  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome! {" "}
      <button onClick={() => {
        fakeAuth.signout(() => history.push("/"));
      }}>
        Sign Out
      </button>
    </p>
  ) : (
    <p style={{fontSize:'10px'}}>(You are not logged in.)</p>
  );
}

function PrivateRoute({children, ...rest}){
  return(
    <Route
      {...rest}
      render={({location})=>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: {from:location}
          }}
          />
        )
      }  
    />
  )
}

function PublicPage(){
  return <HomePage/>
}

function ProtectedPage(){
  return <UserPage/>
}

function Insane(){
  let history = useHistory();
  return(
    <p>
      Welcome! {" "}
      <button onClick={() => {
        fakeAuth.signout(() => history.push("/"));
      }}>
        Sign Out
      </button>
    </p>
  );
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname:"/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return(
    <div>
      <p>You Must log in to to proceed</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

// import HomePage from './pages/HomePage';
// import UserPage from './pages/UserPage';

// export default function App() {
//   return (
//     <Switch>
//       <Route exact path="/" component={HomePage} />
//       <Route path="/:id" component={UserPage} />
//     </Switch>
//   )
// }