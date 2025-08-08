import { Container, Typography } from "@mui/material";
import SubscriptionForm from "./components/SubscriptionForm";
import DataTable from "./components/DataTable";

function App() {
  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Shop Subscription Form
      </Typography>
      <SubscriptionForm />
      <DataTable />
    </Container>
  );
}

export default App;
