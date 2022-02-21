import { DAppProvider } from "@usedapp/core";
import { Container } from "@mui/material";
import { Main } from "./components/Main";
import Header from "./components/Header";

function App() {
    return (
        <DAppProvider config={{}}>
            <Header />
            <Container maxWidth="md">
                <Main />
            </Container>
        </DAppProvider>
    );
}

export default App;
