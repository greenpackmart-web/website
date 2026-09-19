function ProductImage({ name, image }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-linear-to-br from-tint to-mist/60">
      <span className="font-heading text-4xl font-extrabold text-forest/70">
        {name.charAt(0)}
      </span>
    </div>
  )
}

export default ProductImage
