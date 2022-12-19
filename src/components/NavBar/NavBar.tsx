import { 
    Link, 
    Box 
} from '@mui/material';

import { 
    NavLink as RouterLink 
} from 'react-router-dom';

type Props = {
    links: {
        text: string;
        href: string;
        'data-testid'?: string;
    }[];
};

const navLinkStyles = {
    cursor: 'pointer',
    padding: '4px 8px',
    '&:not(:last-of-type)': {
        marginBottom: '16px',
    },
    '&.active': {
        fontWeight: '600',
        backgroundColor: '#000029'
    }
};

function NavBar(props: Props) {
    const {
        links
    } = props,
        linksMarkup = links.map((link) => {
            const {
                text,
                href,
                'data-testid': testId
            } = link;

            return (
                <Link
                    aria-current="page"
                    component={RouterLink}
                    key={href}
                    to={href}
                    color="#fff"
                    underline="hover"
                    sx={navLinkStyles}
                    data-testid={testId}
                >
                    {text}
                </Link>
            );
        }),
        logoMarkup = (
            <Link
                component={RouterLink}
                to="/"
                sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
            >
                <img src="/surelogo.svg" alt="logo"></img>
            </Link>
        );

    return (
        <Box
            component="aside"
            sx={{
                background: '#0c2975',
                padding: '16px',
                width: '200px',
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {logoMarkup}

            {linksMarkup}
        </Box>
    );
}

export default NavBar;
