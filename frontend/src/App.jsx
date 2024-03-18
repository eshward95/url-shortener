import "./App.css";
import Layout from "./components/Layout";
import { ListContextProvider } from "./context/ListContext";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ListContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Layout />
      </ThemeProvider>
    </ListContextProvider>
  );
}

export default App;
