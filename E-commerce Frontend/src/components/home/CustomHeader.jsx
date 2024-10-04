export default function CustomHeader({ title, description }) {
    return (
        <div className='text-center py-6'>
            <h2 className='m-0 text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold uppercase font-italic gradient-text'>
                {title}
            </h2>
            <p className='m-0 text-gray-200'>{description}</p>
        </div>
    )
}
