import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps as ChakraBreadcrumbItemProps,
  BreadcrumbLink,
  BreadcrumbLinkProps as ChakraBreadcrumbLinkProps,
  BreadcrumbProps as ChakraBreadcrumbProps,
} from '@chakra-ui/react';
import React, {forwardRef} from 'react';

interface BreadcrumbItemProps {
  href?: string;
  text: string;
  isCurrent?: boolean;
  breadCrumbItemProps?: ChakraBreadcrumbItemProps;
  breadCrumbLinkProps?: ChakraBreadcrumbLinkProps;
}

export interface BreadCrumbProps {
  breadCrumbs: BreadcrumbItemProps[];
  breadCrumbProps?: ChakraBreadcrumbProps;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadCrumbProps>(
  ({breadCrumbs, breadCrumbProps, ...rest}, ref) => (
    <ChakraBreadcrumb ref={ref} {...breadCrumbProps} {...rest}>
      {breadCrumbs.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrent} {...item.breadCrumbItemProps}>
          <BreadcrumbLink fontSize="sm" href={item.href} {...item.breadCrumbLinkProps}>
            {item.text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  ),
);
