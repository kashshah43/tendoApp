import { render, screen } from '@testing-library/react';
import App from './App';


describe("H-CAP app testing", ()=> {
  beforeEach(() => {
    render(<App />);
  })
  test('renders learn react link', () => {
    const linkElement = screen.getByText(/H-CAPS/i);
    expect(linkElement).toBeInTheDocument();
  });

})
