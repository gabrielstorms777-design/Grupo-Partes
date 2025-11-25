export interface Check {
  title: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  image: string;
  position: { top: string; left: string };
  sections: {
    title: string;
    checks: Check[];
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
          { title: 'Nivel de aceite', description: 'Medir con varilla y verificar que esté entre los niveles MÍN y MÁX.' },
          { title: 'Fugas de aceite', description: 'Inspección visual de juntas, retenes, cárter y mangueras.' },
          { title: 'Presión de aceite', description: 'Verificar en el panel de control durante el funcionamiento.' },
          { title: 'Estado del filtro de aceite', description: 'Comprobar horómetro para el próximo reemplazo.' },
        ],
      },
      {
        title: 'Sistema de Combustible',
        checks: [
          { title: 'Filtro de combustible primario (separador de agua)', description: 'Drenar agua y sedimentos.' },
          { title: 'Filtro de combustible secundario', description: 'Comprobar horómetro para próximo reemplazo.' },
          { title: 'Fugas de combustible', description: 'Inspeccionar bomba de inyección, inyectores y líneas de combustible.' },
        ],
      },
      {
        title: 'Sistema de Admisión de Aire',
        checks: [
          { title: 'Estado del filtro de aire', description: 'Revisar indicador de restricción y/o inspeccionar visualmente.' },
          { title: 'Mangueras de admisión y turbo', description: 'Verificar estado de abrazaderas y mangueras (sin grietas).' },
        ],
      },
      {
        title: 'Sistema de Refrigeración',
        checks: [
          { title: 'Correa del ventilador/alternador', description: 'Revisar tensión y estado (sin grietas ni desgaste excesivo).' },
          { title: 'Bomba de agua', description: 'Inspección visual en busca de fugas por el sello.' },
        ],
      },
      {
        title: 'General',
        checks: [
          { title: 'Soportes del motor (tacos)', description: 'Verificar estado, sin roturas ni vibración excesiva.' },
          { title: 'Precalentadores', description: 'Comprobar su funcionamiento en el arranque (si aplica).' },
          { title: 'Ruidos y vibraciones', description: 'Escuchar ruidos anormales durante el funcionamiento.' },
          { title: 'Alternador', description: 'Verificar que cargue correctamente la batería y que no presente ruidos anormales.' },
          { title: 'Motor de arranque', description: 'Comprobar el correcto funcionamiento al encender el equipo y que las conexiones estén firmes.' },
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
          { title: 'Nivel de refrigerante', description: 'Verificar en el tanque de expansión o directamente en el radiador (en frío).' },
          { title: 'Limpieza del panel', description: 'Asegurar que las aletas estén limpias, sin obstrucciones de polvo, hojas o suciedad.' },
          { title: 'Estado de mangueras y abrazaderas', description: 'Buscar grietas, hinchazón, fugas y abrazaderas oxidadas o flojas.' },
          { title: 'Tapa del radiador', description: 'Comprobar que el sello de goma esté en buen estado.' },
          { title: 'Fugas en el panel', description: 'Inspección visual del cuerpo del radiador en busca de manchas de humedad.' },
        ],
      },
    ],
  },
  {
    id: 'generador',
    title: '3. Generador',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907c22368dfc2780d9020d6.png',
    position: { top: '67.05%', left: '38.85%' },
    sections: [
      {
        title: 'Inspección',
        checks: [
          { title: 'Limpieza general', description: 'Verificar que las rejillas de ventilación no estén obstruidas por polvo o suciedad.' },
          { title: 'Conexiones eléctricas', description: 'Inspección visual de que los cables de potencia estén ajustados y sin signos de sobrecalentamiento.' },
          { title: 'Rodamientos', description: 'Escuchar por zumbidos o ruidos anormales durante el funcionamiento.' },
          { title: 'Diodos y regulador de voltaje (AVR)', description: 'Verificar lecturas de voltaje estables en el panel.' },
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
          { title: 'Lecturas de instrumentos', description: 'Verificar que el voltaje, frecuencia (Hz), presión de aceite y temperatura sean correctos.' },
          { title: 'Parada de emergencia', description: 'Probar el funcionamiento del botón de parada.' },
          { title: 'Alarmas y advertencias', description: 'Revisar en el historial si hay fallas registradas.' },
          { title: 'Estado físico', description: 'Limpieza del panel y verificar que la pantalla y los botones funcionen.' },
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
          { title: 'Estado de los bornes', description: 'Verificar que estén limpios, sin sulfatación y bien ajustados.' },
          { title: 'Voltaje', description: 'Medir el voltaje en reposo (>12.4V) y durante el arranque.' },
          { title: 'Nivel de electrolito', description: 'Si no es sellada, verificar que el líquido cubra las placas.' },
          { title: 'Estado del cargador', description: 'Comprobar que el cargador de batería esté funcionando correctamente.' },
          { title: 'Sujeción', description: 'Asegurar que la batería esté firmemente sujeta en su soporte.' },
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
          { title: 'Nivel de combustible', description: 'Verificar visualmente o en el medidor del panel.' },
          { title: 'Fugas', description: 'Inspección visual de todo el tanque y sus conexiones.' },
          { title: 'Purga de agua/sedimentos', description: 'Abrir la válvula de purga inferior para drenar impurezas.' },
          { title: 'Respiradero del tanque', description: 'Asegurar que no esté obstruido.' },
          { title: 'Estado del medidor', description: 'Comprobar que el medidor de nivel funcione correctamente.' },
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
          { title: 'Fugas en el sistema', description: 'Revisar uniones, colector, flexible y silenciador en busca de fugas de gases (hollín).' },
          { title: 'Soportes y fijaciones', description: 'Verificar que todo el sistema de escape esté bien sujeto.' },
          { title: 'Aislamiento térmico', description: 'Comprobar que los protectores de calor estén en su lugar y en buen estado.' },
          { title: 'Salida de humos', description: 'Asegurar que la salida final no esté obstruida.' },
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
          { title: 'Estado de cerraduras y bisagras', description: 'Lubricar y verificar su correcto funcionamiento.' },
          { title: 'Insonorización interna', description: 'Inspeccionar que el material aislante no esté dañado o desprendido.' },
          { title: 'Limpieza general', description: 'Limpieza externa e interna de la cabina.' },
          { title: 'Sellos de las puertas', description: 'Comprobar que los burletes de goma estén en buen estado para evitar fugas de ruido y entrada de agua.' },
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
          { title: 'Limpieza interior', description: 'Verificar ausencia de polvo o suciedad excesiva en el interior del gabinete.' },
          { title: 'Conexiones eléctricas', description: 'Revisar el apriete de los bornes de potencia.' },
          { title: 'Indicadores luminosos', description: 'Comprobar el funcionamiento de las luces de estado (Red / Grupo).' },
          { title: 'Prueba de funcionamiento', description: 'Realizar un test de transferencia (simulando un corte de red) para asegurar su correcta operación.' },
        ],
      },
    ],
  },
  {
    id: 'sector_entorno',
    title: '10. Seguridad e Higiene del Sector',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6907db06529f0595a7b77062.png',
    position: { top: '94.89%', left: '46.81%' },
    sections: [
      {
        title: 'Inspección de Seguridad',
        checks: [
          { title: 'Sector de instalación', description: 'El espacio alrededor del grupo debe estar limpio y despejado de obstáculos.' },
          { title: 'Ausencia de materiales inflamables', description: 'Verificar que no haya materiales combustibles o inflamables cerca del equipo.' },
          { title: 'Puesta a tierra', description: 'Inspeccionar visualmente la conexión de puesta a tierra del equipo y del tablero.' },
          { title: 'Iluminación', description: 'Asegurar que el área de trabajo cuente con iluminación adecuada para operar de forma segura.' },
          { title: 'Ventilación', description: 'Asegurar que la entrada y salida de aire del grupo no estén bloqueadas para una correcta refrigeración.' },
          { title: 'Extintor', description: 'Verificar que el extintor de incendios cercano esté accesible, con carga y vigente.' },
          { title: 'Cableado', description: 'Inspeccionar que el cableado externo esté prolijo, seguro y sin daños visibles.' },
          { title: 'Parada de emergencia', description: 'Verificar la ubicación y fácil acceso a la parada de emergencia externa (si aplica).' },
        ],
      },
    ],
  },
  {
    id: 'diagnostico',
    title: '11. Diagnóstico y Recomendaciones',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/691627aab827257f1a60f7ef.png',
    position: { top: '0', left: '0' },
    sections: [
      { title: 'Fallas Detectadas', checks: [] },
      { title: 'Causas de la Falla', checks: [] },
      { title: 'Recomendaciones', checks: [] },
      { title: 'Soluciones Aplicadas', checks: [] },
    ],
  },
  {
    id: 'insumos',
    title: '12. Insumos Utilizados',
    image: 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/6916200dac722f51208e2c8a.png',
    position: { top: '0', left: '0' },
    sections: [{ title: 'Lista de Insumos', checks: [] }],
  },
];