import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

export default function ProfileHistoryTab({ historyTabs, tab, username }) {
    const navigate = useNavigate();

    return (
        <>
            {historyTabs.map((currentTab) => {
                return (
                    <Button
                        variant='tab'
                        className={`flex w-24 justify-center px-2 py-1 ${tab === currentTab.value ? `border border-b-4 border-gray-200 border-b-blue-500 font-medium` : `text-gray-400`}`}
                        key={currentTab.value}
                        onClick={() => {
                            navigate(`/user/${username}/${currentTab.value}`);
                        }}
                    >
                        <span>{currentTab.name}</span>
                    </Button>
                );
            })}
        </>
    );
}
