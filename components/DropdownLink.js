import Link from 'next/link';
import React from 'react';

const DropdownLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default DropdownLink;
