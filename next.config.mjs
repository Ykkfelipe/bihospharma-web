// ============================================================
// DOCUMENTACIÓN DE HANDOVER — next.config.mjs
// Proyecto: Sitio web Bihospharma IPS
// ============================================================
// Este archivo configura cómo Next.js construye y sirve el sitio.
// No contiene lógica de negocio — solo ajustes de rendimiento
// y compatibilidad. Normalmente no hay que tocarlo a menos que
// se agregue una nueva librería o cambie el hosting.
// ============================================================
import path from 'path';

const nextConfig = {
  outputFileTracingRoot: path.resolve('.'),
  // Optimización de imágenes:
  // Next.js detecta automáticamente qué formatos soporta el navegador
  // y sirve AVIF o WebP en vez de PNG/JPEG. AVIF es ~40% más liviano.
  // Si en el futuro se agregan imágenes al sitio, esto las optimiza sin
  // necesidad de hacer nada adicional.
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // Anchos de pantalla para los que Next genera versiones de la imagen
    // (para el atributo srcset — sirve la imagen del tamaño justo)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Tamaños para imágenes pequeñas como íconos y miniaturas
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Silencia una advertencia de Next.js 16 en el servidor de desarrollo local.
  // No afecta la producción.
  turbopack: {},

  // Headers de caché para los archivos estáticos:
  //
  // Los archivos JS y CSS que genera Next.js (en /_next/static/) tienen
  // un hash único en su nombre — si el archivo cambia, el nombre cambia.
  // Por eso podemos cachearlos por 1 año sin riesgo (max-age=31536000).
  //
  // Las imágenes no tienen hash, así que usamos stale-while-revalidate:
  // el navegador sirve la imagen del caché inmediatamente (rápido para el usuario)
  // y en segundo plano descarga una versión nueva si existe.
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  // Configuración especial de Webpack para evitar un error de compilación
  // causado por pdfjs-dist, que intenta importar un binario nativo "canvas"
  // que no existe en el entorno de Next.js/Node.
  //
  // La solución: decirle a Webpack que trate "canvas" como un módulo vacío
  // e ignorar cualquier archivo .node (binarios nativos).
  //
  // Si en algún momento se elimina pdfjs-dist del proyecto,
  // todo este bloque webpack puede borrarse también.
  webpack: (config, { webpack }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
    };

    config.externals = Array.isArray(config.externals)
      ? [...config.externals, 'canvas']
      : config.externals;

    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      canvas: false,
    };

    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\.node$/ }));

    return config;
  },
};

export default nextConfig;
