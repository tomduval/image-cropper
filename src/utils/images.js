export function createImageUrl(image, context, value = 0) {
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
  if (image.baseUrl) {
    return `${image.baseUrl}/${image.folder}/${image.uuid}${resolution}.${image.extension}`;
  } else {
    return `${image.url}/${image.folder}/${image.uuid}${resolution}.${image.extension}`;
  }
}

global.createImageUrl = createImageUrl;
