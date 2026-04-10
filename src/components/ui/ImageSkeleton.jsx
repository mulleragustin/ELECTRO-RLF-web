import { useState } from 'react'

export default function ImageSkeleton({ src, alt, className = '', wrapperClassName = '', priority = false, objectFit = 'cover', children }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[#1a1a1a] ${wrapperClassName} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-[#2a2a2a]" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        fetchpriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        style={{ objectFit }}
        className={`h-full w-full transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {children}
    </div>
  )
}
