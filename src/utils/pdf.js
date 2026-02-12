import html2pdf from 'html2pdf.js'

export async function generatePDF(element, filename = 'proposal.pdf') {
  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  }

  const worker = html2pdf().set(opt).from(element)
  const blob = await worker.outputPdf('blob')
  return new File([blob], filename, { type: 'application/pdf' })
}

export async function shareOrDownloadPDF(element, filename) {
  const file = await generatePDF(element, filename)

  const canShare =
    typeof navigator.share === 'function' &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })

  if (canShare) {
    await navigator.share({
      files: [file],
      title: 'Proposal',
      text: 'Here is your project proposal.',
    })
  } else {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
}
