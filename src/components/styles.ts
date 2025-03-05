import styled, { createGlobalStyle } from 'styled-components';

const colors = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#60a5fa',
  secondary: '#f3f4f6',
  dark: '#1f2937',
  light: '#ffffff',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  lightGray: '#f9fafb',
  mediumGray: '#e5e7eb',
  darkGray: '#6b7280',
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textLight: '#9ca3af',
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${colors.textPrimary};
  background-color: ${colors.light};
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 6px;
    width: 95%;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 0.75rem;
    width: 95%;
    max-width: 95%;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${colors.primary};
  position: relative;
  padding-bottom: 0.75rem;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${colors.primary};
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: ${colors.dark};
  display: flex;
  align-items: center;

  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background-color: ${colors.primary};
    margin-right: 0.75rem;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const TableHeader = styled.th`
  background-color: ${colors.primary};
  color: ${colors.light};
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  position: sticky;
  top: 0;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.lightGray};
  }

  &:hover {
    background-color: ${colors.mediumGray};
    transition: background-color 0.2s ease;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${colors.mediumGray};
  font-size: 0.9375rem;

  &:last-child {
    font-weight: 600;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: ${colors.secondary};
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.25rem 0.75rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${colors.textSecondary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 6px;
  font-size: 1rem;
  background-color: ${colors.light};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.primary};
  color: ${colors.light};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${colors.primaryDark};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: ${colors.textLight};
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

export const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  background-color: ${colors.primary};
  color: ${colors.light};
  border-radius: 6px;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  width: 100%;
  box-sizing: border-box;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 1rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid ${colors.mediumGray};
  border-radius: 50%;
  border-top-color: ${colors.primary};
  animation: spin 1s ease infinite;
  margin-right: 0.75rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

export const ErrorMessage = styled.div.attrs({
  role: 'alert',
})`
  color: ${colors.danger};
  background-color: rgba(239, 68, 68, 0.1);
  padding: 0.875rem 1rem;
  border-radius: 6px;
  border-left: 4px solid ${colors.danger};
  font-size: 0.9375rem;
  margin-top: 0.25rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
`;

export const DateInfo = styled.p`
  text-align: center;
  color: ${colors.textSecondary};
  font-style: italic;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
  background-color: ${colors.lightGray};
  padding: 0.5rem;
  border-radius: 6px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.375rem;
  }
`;
