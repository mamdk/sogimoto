import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    count: number;
    category: string;
    created_at: Date;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
                <div className="md:w-1/3 relative aspect-square">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                    />
                    <span className="absolute top-2 left-2 bg-indigo-600/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
						{product.category}
					</span>
                </div>
                <div className="md:w-2/3 p-4 flex flex-col h-full">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{product.title}</h3>
                            <span className="text-indigo-600 font-bold whitespace-nowrap ml-2">
								${product.price.toLocaleString()}
							</span>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <div className="flex mr-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">({product.count})</span>
                            </div>

                            <span className="text-xs text-gray-400">{new Date(product.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
                            <Link href={`/products/${product.id}`} className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                                more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
