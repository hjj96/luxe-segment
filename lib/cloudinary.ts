/**
 * Вставляет трансформации Cloudinary в URL, чтобы грузить меньший вес
 * (быстрее на медленных каналах и в РФ).
 * @see https://cloudinary.com/documentation/image_transformation_reference
 */
export function optimizeCloudinaryDeliveryUrl(url: string, maxWidth: number): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) return url;
  if (url.includes("placehold.co")) return url;

  const chain = `w_${maxWidth},q_auto,f_auto`;

  // Уже есть наша цепочка — меняем только ширину
  const reExisting = /\/image\/upload\/w_(\d+),q_auto,f_auto\//;
  if (reExisting.test(url)) {
    return url.replace(reExisting, `/image/upload/${chain}/`);
  }

  // Стандартный путь: .../image/upload/v123/...
  return url.replace(/\/image\/upload\/(v\d+\/)/, `/image/upload/${chain}/$1`);
}
