import React from 'react';

const ColorPreview = () => {
  const colors = [
    {
      name: 'Primary',
      hex: '#155BC8',
      usage: 'Nền nút chính, link, header, icon'
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      usage: 'Nền chính, background section, text trên màu đậm'
    },
    {
      name: 'Black',
      hex: '#000000',
      usage: 'Text chính, icon, border'
    },
    {
      name: 'Primary Light (hover)',
      hex: '#1247A3',
      usage: 'Hover/active state cho button, link; nền nhẹ cho badge/card'
    },
    {
      name: 'Accent (call-to-action)',
      hex: '#FF6600',
      usage: 'Nút phụ, highlights, notification badge'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black tracking-tight">MyMatch Design System</h1>
        
        {/* Color Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-black/10">
          <div className="grid grid-cols-[1fr,120px,2fr] text-white bg-black p-4">
            <div className="font-medium">Vai trò</div>
            <div className="font-medium">Mã màu</div>
            <div className="font-medium">Gợi ý sử dụng</div>
          </div>
          
          <div className="divide-y divide-black/5">
            {colors.map((color, index) => (
              <div key={index} className="grid grid-cols-[1fr,120px,2fr] p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-md border border-black/10 shadow-sm" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-medium tracking-tight">{color.name}</span>
                </div>
                <div className="font-mono text-sm uppercase">{color.hex}</div>
                <div className="text-black/70 text-[15px]">{color.usage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Usage Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Example Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Button Examples */}
            <div className="p-6 bg-white rounded-lg shadow-lg border border-black/10">
              <h3 className="text-lg font-semibold mb-4 tracking-tight">Buttons</h3>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-[#155BC8] text-white rounded-md hover:bg-[#1247A3] transition-colors font-medium">
                  Primary Button
                </button>
                <button className="w-full px-4 py-2 bg-[#FF6600] text-white rounded-md hover:opacity-90 transition-opacity font-medium">
                  Accent Button
                </button>
                <button className="w-full px-4 py-2 border border-[#155BC8] text-[#155BC8] rounded-md hover:bg-[#155BC8] hover:text-white transition-colors font-medium">
                  Outline Button
                </button>
              </div>
            </div>
            
            {/* Text Examples */}
            <div className="p-6 bg-white rounded-lg shadow-lg border border-black/10">
              <h3 className="text-lg font-semibold mb-4 tracking-tight">Typography</h3>
              <div className="space-y-4">
                <p className="text-2xl font-bold text-black tracking-tight">Heading Text</p>
                <p className="text-base text-black leading-relaxed">Regular body text with good readability using Inter font.</p>
                <p className="text-[15px] text-black/70 leading-relaxed">Secondary text with slightly reduced contrast</p>
                <a href="#" className="text-[#155BC8] hover:text-[#1247A3] transition-colors font-medium">Link Text</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview; 