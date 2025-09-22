import MUITable from "./components/MUITable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient -> React Query'nin merkezi yöneticisi
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MUITable />
      </QueryClientProvider>
    </>
  );
}

export default App;
