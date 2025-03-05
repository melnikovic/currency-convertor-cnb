import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrencyData } from './hooks/useCurrencyData';
import CurrencyList from './components/CurrencyList';
import CurrencyConverter from './components/CurrencyConverter';
import { Container, Title, Subtitle, ErrorMessage, LoadingContainer, LoadingSpinner, GlobalStyle } from './components/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const { data, isLoading, error } = useCurrencyData();
  const currencies = data || (Array.isArray(data) ? data : []);

  if (isLoading) {
    return (
      <Container>
        <Title>Czech National Bank Currency Exchange</Title>
        <LoadingContainer>
          <LoadingSpinner /> Loading exchange rates...
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Czech National Bank Currency Exchange</Title>
        <ErrorMessage>
          Error loading exchange rates: {error.message}
          <p>Please check your internet connection and try again.</p>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Czech National Bank Currency Exchange</Title>

      <Subtitle>Currency Converter</Subtitle>
      <CurrencyConverter currencies={currencies} />

      <Subtitle>Current Exchange Rates</Subtitle>
      <CurrencyList currencies={currencies} isLoading={isLoading} error={error} />
    </Container>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
