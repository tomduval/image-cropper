export function createModelUrl(image, context, value) {
  if (!image) return "";

  let resolution;
  switch (context) {
    case "real":
      resolution = "";
      break;
    case "thumbnail":
      resolution = ".128";
      break;
    case "high":
      resolution = ".1024";
      break;
    case "extreme":
      resolution = ".2048";
      break;
    case "medium":
      resolution = ".256";
      break;
    case "low":
      resolution = ".128";
      break;
    case "resolution":
      resolution = `.${value}`;
      break;
    case "actualUrl":
      return image.url;
    default:
      resolution = ".256";
  }
  return `${image.baseUrl}/${image.folder}/${image.uuid}${resolution}.${image.extension}`;
}
