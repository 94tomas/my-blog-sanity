export function buildImage(inputString) {
    // Usar una expresión regular para extraer la parte relevante del string
    let match = inputString.match(/image-(\w+)-(\d+x\d+)-(\w+)/)
    let fileName = ''
    if (match) {
        // Construir el nuevo nombre de archivo utilizando las partes capturadas
        fileName = match[1] + "-" + match[2] + "." + match[3]
    }

    return fileName;
}