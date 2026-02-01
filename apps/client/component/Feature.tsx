import { Pencil, Users, Lock, Zap, Download, Palette } from 'lucide-react';

const features = [
  {
    icon: Pencil,
    title: 'Hand-Drawn Style',
    description: 'Create beautiful diagrams with a hand-drawn, sketch-like aesthetic that feels natural and engaging.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. See changes as they happen and collaborate seamlessly.',
    color: 'purple',
  },
  {
    icon: Lock,
    title: 'End-to-End Encrypted',
    description: 'Your data is encrypted and secure. Privacy is built into every feature we create.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed and performance. No lag, no delays, just smooth drawing experience.',
    color: 'yellow',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Export your drawings as PNG, SVG, or clipboard. Integrate with your favorite tools.',
    color: 'pink',
  },
  {
    icon: Palette,
    title: 'Customizable',
    description: 'Choose from multiple themes, colors, and styles to make your drawings truly yours.',
    color: 'indigo',
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-200' },
  pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
  indigo: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
};

function Feature() {
  return (
    <section id='features' className="py-20 pb-20 bg-gray-200">
     <div className="max-w-7xl mx-auto">
      <div className="flex flex-col  items-center space-y-10">
        <div className="flex flex-col gap-3">
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>Everything you need to sketch</h1>
          <span className='text-gray-600 text-xl max-w-2xl mx-auto'>Powerful features wrapped in a simple, intuitive interface</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f,idx)=>{
            const Icon=f.icon
            const colors=colorMap[f.color]
            return (
              
              <div key={idx} style={{ animationDelay: `${idx * 0.1}s` }} className="bg-white p-8 space-y-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all transform hover:-translate-y-1 hover:shadow-xl group animate-fade-in-up">
              
                <div className={`w-14 h-14 ${colors.bg} ${colors.icon} ${colors.border} flex items-center justify-center rounded-xl border-2 group-hover:scale-110`}><Icon className='w-7 h-7' strokeWidth={2}/></div>
                <h1 className='text-xl font-bold text-gray-900'>{f.title}</h1>
                <p className='text-gray-600 leading-relaxed'>{f.description}</p>
                
              </div>
            )
          })}
        </div>
      </div>
     </div>
    </section>
  )
}

export default Feature