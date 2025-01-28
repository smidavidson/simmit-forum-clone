import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Button from './Button';

export default function Pagination({ count }) {
    // Get current page from URL
    const [searchParams, setSearchParams] = useSearchParams();
    // If page search params DNE set to 1
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));
    console.log('currentPage: ', currentPage);

    const pageCount = Math.ceil(count / PAGE_SIZE);

    function nextPage() {
        // If we're on the last page, then don't set page query in URL to next page
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        searchParams.set('page', next);
        // Update search params
        setSearchParams(searchParams);
    }
    function prevPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set('page', prev);
        setSearchParams(searchParams);
    }

    if (pageCount <= 1) {
        return null;
    }

    return (
        <div className='mx-auto max-w-4xl px-4 py-3'>
            <div className='flex items-center justify-between'>
                <Button
                    variant='inline'
                    className='px-2 py-1 text-sm'
                    onClick={() => {
                        prevPage();
                    }}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft></HiChevronLeft>
                    <span>Previous</span>
                </Button>
                <Button
                    variant='inline'
                    className='px-2 py-1 text-sm'
                    onClick={() => {
                        nextPage();
                    }}
                    disabled={currentPage === pageCount}
                >
                    <span>Next</span>
                    <HiChevronRight></HiChevronRight>
                </Button>
            </div>
        </div>
    );
}
