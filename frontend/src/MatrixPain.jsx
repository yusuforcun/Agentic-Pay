import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Tam ekran yap
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix karakterleri (Katakana + Latin)
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Her kolonun Y koordinatını tutar
    const rainDrops = Array(Math.ceil(columns)).fill(1);

    const draw = () => {
      // Hafif siyah perde (iz bırakma efekti için opacity 0.05)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Matrix Yeşili
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        // Rastgele karakter seç
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Karakteri çiz
        // Renk tonuyla oyna (bazıları daha parlak)
        ctx.fillStyle = Math.random() > 0.95 ? '#FFF' : '#0aff0a'; 
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Ekranın altına geldiyse veya rastgele bir durumda başa sar
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    // Pencere boyutu değişirse canvas'ı güncelle
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20"
    />
  );
};

export default MatrixRain;