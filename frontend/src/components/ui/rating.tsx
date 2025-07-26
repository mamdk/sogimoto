import { Star, StarHalf } from 'lucide-react';

function Rating({ rating, showScore = true }) {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <span key={i}>
						{rating >= starValue ? (
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ) : rating >= starValue - 0.5 ? (
                            <div className={'relative'}>
                                <StarHalf className="absolute w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <Star className="w-5 h-5 text-gray-300" />
                            </div>
                        ) : (
                            <Star className="w-5 h-5 text-gray-300" />
                        )}
					</span>
                );
            })}
            {showScore && <span className={'text-gray-500 ml-2 text-sm'}>{rating}</span>}
        </div>
    );
}

export default Rating
