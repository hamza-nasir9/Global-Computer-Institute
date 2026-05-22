'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { GALLERY_ITEMS } from '@/lib/data';

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (images, index) => {
    setLightbox({ images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Keyboard navigation
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      if (!lightbox) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
  }

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        
        <SectionHeader 
          label="Campus Life" 
          title="Student Life &" 
          highlight="Gallery"
          subtitle="A glimpse into the vibrant, innovative, and inspiring world of GCI campus life." 
          center 
        />
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(GALLERY_ITEMS, index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 ? 'md:row-span-2' : ''
              }`}
              style={{
                gridRow: index === 0 ? 'span 2' : 'auto',
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#D4A017] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={18} className="text-black" />
                </div>
              </div>
              
              {/* Label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs md:text-sm font-medium truncate">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* View Full Gallery Button */}
        <div className="text-center mt-8 md:mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm border px-5 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 hover:text-[#F5C842] hover:border-[#D4A017]/40"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-medium)' }}
          >
            View Full Gallery
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X size={24} className="text-white" />
          </button>
          
          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
          
          {/* Current Image */}
          <div
            className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.images[lightbox.currentIndex].image}
              alt={lightbox.images[lightbox.currentIndex].label}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
            />
            
            {/* Image Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-center text-sm md:text-base">
                {lightbox.images[lightbox.currentIndex].label}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}