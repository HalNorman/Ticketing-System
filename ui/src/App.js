// App.js
// Simply routes to Homepage after login
import './App.css';
import HomePage from './HomePage/HomePage'


function App(props) {
  return (
      <div className="App">
        <HomePage user = {props.user}/> {/* routes to main homepage */ }
      </div>
  );
}

export default App;
