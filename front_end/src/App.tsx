import { DAppProvider } from "@usedapp/core";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Main } from "./components/Main";
import Header from "./components/Header";

const theme = createTheme({
    palette: {
        background: {
            default: "#ffede6"
        }
    }
});

function App() {
    return (
        <DAppProvider config={{notifications: {
            expirationPeriod: 1000,
            checkInterval: 1000,
        }}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Container maxWidth="md">
                    <Main />
                </Container>
            </ThemeProvider>
        </DAppProvider>
    );
}

export default App;
