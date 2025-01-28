import PostItemUrlLink from '../../ui/PostItemLinkIcon';
import PostItemTextIcon from '../../ui/PostItemTextIcon';

export default function PostItemIcon({ linkUrl }) {
    return linkUrl ? (
        <PostItemUrlLink size={48}></PostItemUrlLink>
    ) : (
        <PostItemTextIcon size={48}></PostItemTextIcon>
    );
}
