import { useCallback, useState } from 'react'

export default function ImageSkeleton({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  objectFit = 'cover',
  width,
  height,
  sizes,
  children,
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  // Con render en servidor la imagen puede terminar de cargar antes de que
  // React hidrate: en ese caso onLoad no se dispara y hay que mirarla al montar.
  const checkLoaded = useCallback((img) => {
    if (img?.complete && img.naturalWidth > 0) setIsLoaded(true)
  }, [])

  return (
    <div className={`relative overflow-hidden bg-[#1a1a1a] ${wrapperClassName} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-[#2a2a2a]" />
      )}
      <img
        ref={checkLoaded}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        width={width}
        height={height}
        sizes={sizes}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
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
