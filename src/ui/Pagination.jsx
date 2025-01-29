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
    const pageCount = Math.ceil(count / PAGE_SIZE);

    // console.log({
    //     count,
    //     currentPage,
    //     pageCount,
    //     PAGE_SIZE,
    // });

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
        <div>
            <div className='flex items-center justify-between pb-3'>
                <Button
                    variant='nextprev'
                    className='flex justify-center px-2 py-1 text-sm w-24'
                    onClick={() => {
                        prevPage();
                    }}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft></HiChevronLeft>
                    <span>Previous</span>
                </Button>
                <Button
                    variant='nextprev'
                    className='flex justify-center px-2 py-1 text-sm w-24'
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
