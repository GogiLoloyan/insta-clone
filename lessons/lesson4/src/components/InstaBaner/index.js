import React, { memo } from 'react';
import PropTypes from 'prop-types'

const InstaBaner = ({ onClick: onParentClick, className }) => {
    return (
        <img
            src="/images/iphone-with-profile.jpg"
            alt="iPhone with Instagram app"
            onClick={onParentClick}
            className={className}
        />
    )
}

InstaBaner.propTypes = {
    onClick: PropTypes.func, // not required
    className: PropTypes.string, // not required
}

export default memo(InstaBaner);