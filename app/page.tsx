import Button from './components/Button'
import Link from 'next/dist/client/link'
import ArtisanSpotlight from './components/ArtisanSpotlight'
import ProductCarousel from './components/ProductCarousel'

export default function Home() {
	return (
		<main>
			{/* Hero Section */}
			<section className='relative w-full h-[100vh] md:h-[100vh] overflow-hidden bottom-0 pt-28 md:pt-0'>
				{/* Background video */}
				<video
					className='absolute inset-0 w-full h-full object-cover opacity-95'
					autoPlay
					loop
					muted
					playsInline>
					<source src='/videos/hero.mp4' type='video/mp4' />
					<source src='/videos/hero.webm' type='video/webm' />
				</video>

				{/* Gradient overlays to improve contrast with dark overlay */}
				<div className='absolute inset-0 pointer-events-none'>
					{/* Overall darkening */}
					<div className='absolute inset-0 bg-black/40' />
					{/* Bottom fade for readability */}
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60' />
				</div>

				{/* CTAs */}
				<div className='relative z-10 max-w-7xl px-6 sm:px-8 lg:px-12 h-full flex items-center'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white'>
							Handcrafted with Heart.
							<br />
							Designed for You.
						</h1>
						<p className='mt-6 text-lg md:text-xl text-white/90 font-accent'>
							Discover unique handmade pieces that bring warmth
							and authenticity into your home.
						</p>
						<div className='mt-8 flex flex-wrap items-center gap-4'>
							<Button className='w-auto px-6 py-3'>
								<Link href='/products'>
									Shop the Collection
								</Link>
							</Button>
							<Link
								href='/about'
								className='inline-flex items-center rounded px-6 py-3 bg-neutral-light/80 text-neutral-dark border border-neutral-light/60 backdrop-blur shadow-sm hover:bg-neutral-light transition-colors'>
								Read Our Story
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Artisan Spotlight Section */}
			<ArtisanSpotlight />

			<section className='py-12 bg-white text-neutral-dark'>
				<div className='mx-auto max-w-7xl px-6 sm:px-8'>
					<div className='mb-6 flex items-baseline justify-between'>
						<h2 className='text-3xl md:text-4xl font-bold text-primary'>
							Crafted Just for You
						</h2>
						<Link
							href='/products'
							className='hidden md:inline-flex bg-accent text-neutral-light px-4 py-2 rounded-md shadow-sm hover:brightness-95'>
							View all
						</Link>
					</div>
					<ProductCarousel />

					<div className='mt-6 md:hidden'>
						<Link href='/products' className='block w-full'>
							<Button className='w-full px-4 py-2'>
								View all
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
