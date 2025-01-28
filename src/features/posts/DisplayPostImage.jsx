export default function DisplayPostImage({ post }) {
    const hasImageUrl = post?.image_url;

    if (hasImageUrl) {
        return (
            <div className='mb-4 flex justify-center'>
                <a href={post.image_url}>
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className='w-full max-w-[500px] cursor-pointer rounded-md border hover:opacity-90'
                    ></img>
                </a>
            </div>
        );
    }

    return null;
}
