
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import './scss/app.scss';
import Routing from "./Routing";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnMount: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        // refetchInterval: 15,
      },
    },
  });


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routing />
        </div>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// rafce
