import './App.css';
import './styles/output.css'
import NameInput from './components/NameInput'
import Button from './components/Button'

function App() {

  return (
    <div className="App">
      {/* {loading? <Modal /> : null} */}
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome!
        </p>
        <Button />
      </div>
    <h2>Search Users:</h2>
    <div className="max-w-sm">
      <NameInput />
    </div>
    </div>
  );
}

export default App;
