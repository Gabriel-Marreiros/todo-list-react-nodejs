import Pagination from "rc-pagination";
import "./rc-pagination.scss";

interface TablePaginationProps {
    totalElements?: number,
    handlePageChange: (page: number, pageSize: number) => void
    onSizeChange?: (current: number, size: number) => void
}

export function TablePagination({ totalElements, handlePageChange, onSizeChange }: TablePaginationProps) {
    const localeSettings = {
        prev_page: 'Página Anterior',
        next_page: 'Próxima Página',
        prev_5: '5 Páginas Anteriores',
        next_5: 'Próximas 5 Páginas',
        prev_3: '3 Páginas Anteriores',
        next_3: 'Próximas 3 Páginas',
        page_size: 'Tamanho da Página',
    }

    return (
        <Pagination
            align="center"
            pageSize={5}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            onChange={handlePageChange}
            locale={localeSettings}
        />
    )
}