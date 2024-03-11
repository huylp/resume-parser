export function base64ToBlob(base64: string, mimeType = "") {
  // Decode base64 string
  const byteCharacters = atob(base64);
  // Create an array to store byte values
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  // Create a typed array from the byte number array
  const byteArray = new Uint8Array(byteNumbers);
  // Create a blob from the typed array and specify MIME type
  return new Blob([byteArray], { type: mimeType });
}
