import "./App.css";
import Layout from "./components/Layout";
import { ListContextProvider } from "./context/ListContext";

function App() {
  return (
    <ListContextProvider>
      <Layout />
    </ListContextProvider>
  );
}

export default App;
