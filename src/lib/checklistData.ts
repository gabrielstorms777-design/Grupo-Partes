export interface ChecklistItem {
  id: string;
  title: string;
  image: string;
  position: { top: string; left: string };
  sections: {
    title: string;
    checks: string[];
  }[];
}

export const checklistData: ChecklistItem[] = [
  {
    id: 'motor',
    title: '1. Motor',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907b367ebf9333d612a7d34.png',
    position: { top: '64.47%', left: '62.26%' },
    sections: [
      {
        title: 'Sistema de Lubricación',
        checks: [
          'Nivel de aceite: Medir con varilla y verificar que esté entre los niveles MÍN y MÁX.',
          'Fugas de aceite: Inspección visual de juntas, retenes, cárter y mangueras.',
          'Presión de aceite: Verificar en el panel de control durante el funcionamiento.',
          'Estado del filtro de aceite: Comprobar horómetro para el próximo reemplazo.',
        ],
      },
      {
        title: 'Sistema de Combustible',
        checks: [
          'Filtro de combustible primario (separador de agua): Drenar agua y sedimentos.',
          'Filtro de combustible secundario: Comprobar horómetro para próximo reemplazo.',
          'Fugas de combustible: Inspeccionar bomba de inyección, inyectores y líneas de combustible.',
        ],
      },
      {
        title: 'Sistema de Admisión de Aire',
        checks: [
          'Estado del filtro de aire: Revisar indicador de restricción y/o inspeccionar visualmente.',
          'Mangueras de admisión y turbo: Verificar estado de abrazaderas y mangueras (sin grietas).',
        ],
      },
      {
        title: 'Sistema de Refrigeración',
        checks: [
          'Correa del ventilador/alternador: Revisar tensión y estado (sin grietas ni desgaste excesivo).',
          'Bomba de agua: Inspección visual en busca de fugas por el sello.',
        ],
      },
      {
        title: 'General',
        checks: [
          'Soportes del motor (tacos): Verificar estado, sin roturas ni vibración excesiva.',
          'Precalentadores: Comprobar su funcionamiento en el arranque (si aplica).',
          'Ruidos y vibraciones: Escuchar ruidos anormales durante el funcionamiento.',
        ],
      },
    ],
  },
  {
    id: 'radiador',
    title: '2. Radiador',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/69078ffe2a48938ef8a0d63e.png',
    position: { top: '58.43%', left: '86.42%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Nivel de refrigerante: Verificar en el tanque de expansión o directamente en el radiador (en frío).',
          'Limpieza del panel: Asegurar que las aletas estén limpias, sin obstrucciones de polvo, hojas o suciedad.',
          'Estado de mangueras y abrazaderas: Buscar grietas, hinchazón, fugas y abrazaderas oxidadas o flojas.',
          'Tapa del radiador: Comprobar que el sello de goma esté en buen estado.',
          'Fugas en el panel: Inspección visual del cuerpo del radiador en busca de manchas de humedad.',
        ],
      },
    ],
  },
  {
    id: 'generador',
    title: '3. Generador',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/69078ffe2a48938ef8a0d63e.png',
    position: { top: '67.05%', left: '38.85%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Limpieza general: Verificar que las rejillas de ventilación no estén obstruidas por polvo o suciedad.',
          'Conexiones eléctricas: Inspección visual de que los cables de potencia estén ajustados y sin signos de sobrecalentamiento.',
          'Rodamientos: Escuchar por zumbidos o ruidos anormales durante el funcionamiento.',
          'Diodos y regulador de voltaje (AVR): Verificar lecturas de voltaje estables en el panel.',
        ],
      },
    ],
  },
  {
    id: 'tablero_carga',
    title: '4. Tablero de Carga',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907b367a0261ac735a480a9.png',
    position: { top: '53.32%', left: '15.72%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Lecturas de instrumentos: Verificar que el voltaje, frecuencia (Hz), presión de aceite y temperatura sean correctos.',
          'Parada de emergencia: Probar el funcionamiento del botón de parada.',
          'Alarmas y advertencias: Revisar en el historial si hay fallas registradas.',
          'Estado físico: Limpieza del panel y verificar que la pantalla y los botones funcionen.',
        ],
      },
    ],
  },
  {
    id: 'bateria',
    title: '5. Batería',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/690796ce843912134c8999b1.png',
    position: { top: '77.54%', left: '33.91%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Estado de los bornes: Verificar que estén limpios, sin sulfatación y bien ajustados.',
          'Voltaje: Medir el voltaje en reposo (>12.4V) y durante el arranque.',
          'Nivel de electrolito: Si no es sellada, verificar que el líquido cubra las placas.',
          'Estado del cargador: Comprobar que el cargador de batería esté funcionando correctamente.',
          'Sujeción: Asegurar que la batería esté firmemente sujeta en su soporte.',
        ],
      },
    ],
  },
  {
    id: 'tanque_combustible',
    title: '6. Tanque de Combustible',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/69079933843912627d89efa2.png',
    position: { top: '86.11%', left: '47.78%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Nivel de combustible: Verificar visualmente o en el medidor del panel.',
          'Fugas: Inspección visual de todo el tanque y sus conexiones.',
          'Purga de agua/sedimentos: Abrir la válvula de purga inferior para drenar impurezas.',
          'Respiradero del tanque: Asegurar que no esté obstruido.',
          'Estado del medidor: Comprobar que el medidor de nivel funcione correctamente.',
        ],
      },
    ],
  },
  {
    id: 'escape',
    title: '7. Escape',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907b1b768dfc25cea8e3ae1.png',
    position: { top: '50.30%', left: '70.84%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Fugas en el sistema: Revisar uniones, colector, flexible y silenciador en busca de fugas de gases (hollín).',
          'Soportes y fijaciones: Verificar que todo el sistema de escape esté bien sujeto.',
          'Aislamiento térmico: Comprobar que los protectores de calor estén en su lugar y en buen estado.',
          'Salida de humos: Asegurar que la salida final no esté obstruida.',
        ],
      },
    ],
  },
  {
    id: 'cabina_grupo',
    title: '8. Cabina Grupo',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907b36705f2752ffd4993cc.png',
    position: { top: '47.94%', left: '40.98%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Estado de cerraduras y bisagras: Lubricar y verificar su correcto funcionamiento.',
          'insonorización interna: Inspeccionar que el material aislante no esté dañado o desprendido.',
          'Limpieza general: Limpieza externa e interna de la cabina.',
          'Sellos de las puertas: Comprobar que los burletes de goma estén en buen estado para evitar fugas de ruido y entrada de agua.',
        ],
      },
    ],
  },
  {
    id: 'tablero_transferencia',
    title: '9. Tablero de Transferencia (ATS)',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/690797b1a0261ac36aa14c97.png',
    position: { top: '62.22%', left: '16.20%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Limpieza interior: Verificar ausencia de polvo o suciedad excesiva en el interior del gabinete.',
          'Conexiones eléctricas: Revisar el apriete de los bornes de potencia.',
          'Indicadores luminosos: Comprobar el funcionamiento de las luces de estado (Red / Grupo).',
          'Prueba de funcionamiento: Realizar un test de transferencia (simulando un corte de red) para asegurar su correcta operación.',
        ],
      },
    ],
  },
  {
    id: 'sector_entorno',
    title: '10. Sector / Entorno',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907db06529f0595a7b77062.png',
    position: { top: '94.89%', left: '46.81%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          'Limpieza del área: El espacio alrededor del grupo debe estar limpio y despejado de obstáculos.',
          'Obstrucción de ventilación: Asegurar que la entrada y salida de aire del grupo no estén bloqueadas.',
          'Derrames: Inspeccionar el suelo debajo del equipo en busca de cualquier tipo de derrame (aceite, combustible, refrigerante).',
          'Seguridad: Verificar que el extintor de incendios cercano esté accesible y vigente.',
        ],
      },
    ],
  },
];