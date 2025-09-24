import MUITable from "./components/MUITable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import './App.css';



// QueryClient -> React Query'nin merkezi yöneticisi
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <MUITable />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
