/* ============================================================================
   📄  TUS DOCUMENTOS  —  este es el único archivo que necesitás editar.
   ============================================================================

   CÓMO AGREGAR UN DOCUMENTO NUEVO:
   1. Subí tu PDF a la carpeta  docs/   (por ejemplo  docs/mi-guia.pdf)
   2. Copiá uno de los bloques { ... } de abajo y pegalo en la lista.
   3. Cambiá los datos:

        titulo      → el nombre que se ve en la portada y la tarjeta
        categoria   → etiqueta corta (ej: "Guía", "Ebook", "Checklist")
        descripcion → 1 o 2 líneas que explican de qué trata
        archivo     → la ruta del PDF dentro de docs/  (ej: "docs/mi-guia.pdf")
        paginas     → cantidad de páginas (texto libre, ej: "12 páginas")
        tono        → color de la portada: 1, 2, 3 o 4 (probá cuál te gusta)

   Para BORRAR un documento, simplemente eliminá su bloque { ... }.
   El orden de la lista es el orden en que aparecen en la web.
   ============================================================================ */

const DOCUMENTOS = [
  {
    titulo: "Tu mañana sin prisa",
    categoria: "Guía",
    descripcion: "Una rutina simple para empezar el día con calma y enfoque, sin sentir que corrés.",
    archivo: "docs/rutina-manana.pdf",
    paginas: "10 páginas",
    tono: 3,
  },
  {
    titulo: "Organizá tu semana",
    categoria: "Guía",
    descripcion: "Un método liviano para planificar 7 días sin agendas eternas ni culpa.",
    archivo: "docs/organizar-semana.pdf",
    paginas: "14 páginas",
    tono: 1,
  },
  {
    titulo: "Finanzas personales: primeros pasos",
    categoria: "Ebook",
    descripcion: "Lo mínimo para ordenar tus gastos y empezar a ahorrar, explicado fácil.",
    archivo: "docs/finanzas-primeros-pasos.pdf",
    paginas: "22 páginas",
    tono: 4,
  },
  {
    titulo: "Escribí tu primer ebook",
    categoria: "Guía",
    descripcion: "De la idea al PDF terminado: estructura, ritmo y cómo no abandonar a mitad.",
    archivo: "docs/primer-ebook.pdf",
    paginas: "18 páginas",
    tono: 2,
  },
  {
    titulo: "Descansar mejor",
    categoria: "Guía",
    descripcion: "Pequeños cambios de hábitos para dormir más profundo y despertar con energía.",
    archivo: "docs/descanso-bienestar.pdf",
    paginas: "9 páginas",
    tono: 3,
  },
  {
    titulo: "Hábitos que duran",
    categoria: "Ebook",
    descripcion: "Por qué los buenos propósitos se caen y cómo armar hábitos que se sostienen.",
    archivo: "docs/habitos-claros.pdf",
    paginas: "16 páginas",
    tono: 1,
  },
];
