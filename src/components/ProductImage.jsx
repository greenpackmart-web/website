function ProductImage({ name, image }) {
  if (image) {
    const imageSrc = `${import.meta.env.BASE_URL}${image.replace(/^\/+/, '')}`

    return (
      <img
        src={imageSrc}
        alt={name}
        className="aspect-square w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-linear-to-br from-tint to-mist/60">
      <span className="font-heading text-4xl font-extrabold text-forest/70">
        {name.charAt(0)}
      </span>
    </div>
  )
}

export default ProductImage
