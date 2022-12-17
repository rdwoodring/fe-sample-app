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

    // TODO: Challenge 2
    it('should render an `href` attribute for each link', () => { });
});
