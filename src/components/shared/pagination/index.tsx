import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (newPage: number) => void;
}

export const DataPagination = ({ currentPage, totalPages, setPage }: PaginationProps) => {

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const items = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - 1)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
        items.push(
            <PaginationItem key={1}>
                <PaginationLink onClick={() => handlePageChange(1)}>{1}</PaginationLink>
            </PaginationItem>
        )
        if (startPage > 2) {
            items.push(<PaginationEllipsis key="ellipsis-start" />)
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <PaginationItem key={i}>
                <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(i)} isActive={i === currentPage}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        )
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            items.push(<PaginationEllipsis key="ellipsis-end" />)
        }
        items.push(
            <PaginationItem key={totalPages}>
                <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
        )
    }

    return (
        <Pagination className="pt-4">
            <PaginationContent>
                {items}
            </PaginationContent>
        </Pagination>
    )
}
