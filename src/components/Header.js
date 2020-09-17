import React from 'react';

const Header = ({ titulo }) => {
    return (
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a className="brand-logo" href="#">{titulo}</a>
            </div>
        </nav>
    );
};

export default Header;