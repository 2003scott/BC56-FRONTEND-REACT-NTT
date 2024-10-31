import React from "react"
import "./pagination.css"
import { FiMoreHorizontal } from "react-icons/fi"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className="Pagination"
        {...props}
    />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className="PaginationContent"
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className="PaginationItem" {...props} />
))
PaginationItem.displayName = "PaginationItem"

type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
};

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'onClick' | 'disabled'> & React.ComponentProps<"a">;


const PaginationLink = ({
    className,
    isActive,
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className="PaginationLink"
        {...props}
    />
)
PaginationLink.displayName = "PaginationLink"


const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className="PaginationEllipsis"
        {...props}
    >
        <FiMoreHorizontal className="h-4 w-4" />
        <span className="sr-only">.....</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
}
