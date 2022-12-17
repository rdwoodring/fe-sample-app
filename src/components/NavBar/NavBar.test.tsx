import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
    const defaultProps = {
        links: [
            { text: 'Link1', href: '/link1' },
            { text: 'Link2', href: '/link2' },
            { text: 'Link3', href: '/link3' },
        ],
    };

    it('should render NavBar links', () => {
        const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

        expect(getByText('Link1')).toBeInTheDocument();
        expect(getByText('Link2')).toBeInTheDocument();
        expect(getByText('Link3')).toBeInTheDocument();
    });

    it('should render an aria-current attribute for the active link', () => {
        const { getByText } = renderWithProviders(<NavBar {...defaultProps} />, {}, {
            initialEntries: ['/link1']
        });

        expect(getByText('Link1').getAttribute('aria-current')).toBe('page');
    });

    it('should not render an aria-current attribute for non-active links', () => {
        const { getByText } = renderWithProviders(<NavBar {...defaultProps} />, {}, {
            initialEntries: ['/link1']
        });

        expect(getByText('Link2').getAttribute('aria-current')).toBeFalsy();
    });

    it('should render an `href` attribute for each link', () => {
        const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

        expect(getByText('Link1')).toHaveAttribute('href');
        expect(getByText('Link2')).toHaveAttribute('href');
        expect(getByText('Link3')).toHaveAttribute('href');
    });

    describe('when having a href attribute', () => {
        it('should be the proper href attribute passed in the props', () => {
            const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

            expect(getByText('Link1')).toHaveAttribute('href', '/link1');
            expect(getByText('Link2')).toHaveAttribute('href', '/link2');
            expect(getByText('Link3')).toHaveAttribute('href', '/link3');
        });
    });
});
