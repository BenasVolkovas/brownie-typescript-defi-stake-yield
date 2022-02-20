import { DAppProvider } from "@usedapp/core";
import Header from "./components/Header";

function App() {
    return (
        <DAppProvider config={{}}>
            <Header />
            <div>Hi!</div>
        </DAppProvider>
    );
}

export default App;
