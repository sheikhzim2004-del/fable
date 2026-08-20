import { Pagination, Button } from "@heroui/react";

export default function EbookPagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null; // 1 page er beshi na thakle pagination dekhabe na

    return (
        <div className="flex justify-center items-center gap-4 mt-10">
            <Button
                size="sm"
                variant="flat"
                isDisabled={page === 1}
                onPress={() => onPageChange(Math.max(page - 1, 1))}
            >
                Previous
            </Button>

            <Pagination
                total={totalPages}
                page={page}
                onChange={onPageChange}
                color="primary"
            />

            <Button
                size="sm"
                variant="flat"
                isDisabled={page === totalPages}
                onPress={() => onPageChange(Math.min(page + 1, totalPages))}
            >
                Next
            </Button>
        </div>
    );
}