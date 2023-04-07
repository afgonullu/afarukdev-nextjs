import { render, screen, waitFor } from '@testing-library/react';

import useNav from '../../hooks/useNav';
import Navbar from './Navbar';

// Mock the useNav hook
jest.mock('../../hooks/useNav', () => jest.fn()); // Update the mock statement

describe('Navbar', () => {
  it('renders loading state', () => {
    useNav.mockReturnValue({ isLoading: true, data: null });

    render(<Navbar />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data when loading is complete', async () => {
    const mockData = [
      { slug: 'item-1', title: 'Item 1', svg: '/path/to/svg1' },
      { slug: 'item-2', title: 'Item 2', svg: '/path/to/svg2' },
    ];
    useNav.mockReturnValue({ isLoading: false, data: mockData });

    render(<Navbar />);

    // Wait for the items to be rendered
    await waitFor(() => screen.getByText('Item 1'));

    expect(screen.getByText('get in touch')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders items with correct classNames', async () => {
    const mockData = [
      { slug: 'item-1', title: 'Item 1', svg: '/path/to/svg1' },
      { slug: 'item-2', title: 'Item 2', svg: '/path/to/svg2' },
    ];
    useNav.mockReturnValue({ isLoading: false, data: mockData });

    const { container } = render(<Navbar />);

    // Wait for the items to be rendered
    await waitFor(() => screen.getByText('Item 1'));

    const listItems = container.querySelectorAll('li');
    expect(listItems[0]).toHaveClass('hover:filter hover:drop-shadow-navbar-svg-1'); // Replace with the actual className returned by NavbarButtonStyles({ intent: 'odd' })
    expect(listItems[1]).toHaveClass('hover:filter hover:drop-shadow-navbar-svg-0'); // Replace with the actual className returned by NavbarButtonStyles({ intent: 'even' })
  });
});
