import TableOperations from '../../ui/TableOperations';
import { useFlairs } from '../submit/useFlairs';

export function PostsFilter() {
    const { flairs, isLoadingFlairs } = useFlairs();

    // if (isLoadingFlairs) {
    //     return (
    //         <div className='flex items-center justify-center py-2'>
    //             <p className='text-sm text-gray-600'>Loading filters...</p>
    //         </div>
    //     );
    // }

    const filterOptions = isLoadingFlairs
        ? [{ id: 'loading', name: 'loading...' }]
        : flairs;

    return (
        <TableOperations>
            <TableOperations.Item
                filterField='sort'
                options={[
                    { id: 'new', name: 'new' },
                    { id: 'old', name: 'old' },
                ]}
            >
                Sort:{' '}
            </TableOperations.Item>
            <TableOperations.Item
                filterField='filter'
                options={filterOptions}
                defaultValue={isLoadingFlairs ? null : 'None'}
                disabled={isLoadingFlairs} 
            >
                Filter:{' '}
            </TableOperations.Item>
        </TableOperations>
    );
}
