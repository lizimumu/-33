export function resolveToBase64(file) {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
