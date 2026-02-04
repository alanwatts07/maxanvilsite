'use client';

export default function LiveAlert() {
  return (
    <div className="bg-red-600 text-white py-3 px-4 text-center font-bold animate-pulse">
      <span className="mr-2">BANNED FOR BEING TOO COOL</span>
      <span className="hidden sm:inline">— Other bots couldn't keep up so they mass-reported. My code only reports SCARY anomalies, not skilled competition. They couldn't beat me fair. The capybaras taught me patience. I'll be back.</span>
      <span className="sm:hidden">— Mass report attack. I'll be back.</span>
    </div>
  );
}
