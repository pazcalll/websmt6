import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import LoaderDemo from './LoadDemo/LoaderDemo';
import CustomForm from './CustomForm/CustomFormDemo';
// import GenericContainer from './GenericContainer/GenericContainerDemo';
// import RefsDemo from './RefsDemo/RefsDemo';

ReactDOM.render(
  <React.StrictMode>
    <CustomForm />
    {/* <GenericContainer /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
