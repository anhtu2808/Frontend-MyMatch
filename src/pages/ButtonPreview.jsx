import React from 'react';

const ButtonPreview = () => {
  const buttonGroups = [
    {
      name: "Filled Buttons",
      buttons: [
        {
          name: "Primary Default",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white transition-all"
        },
        {
          name: "Primary Rounded",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white rounded-full transition-all"
        },
        {
          name: "Primary with Shadow",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white shadow-lg hover:shadow-xl transition-all"
        },
        {
          name: "Success",
          className: "bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
        },
        {
          name: "Warning",
          className: "bg-amber-500 hover:bg-amber-600 text-white transition-all"
        },
        {
          name: "Danger",
          className: "bg-red-500 hover:bg-red-600 text-white transition-all"
        }
      ]
    },
    {
      name: "Outline Buttons",
      buttons: [
        {
          name: "Primary Outline",
          className: "border-2 border-[#155BC8] text-[#155BC8] hover:bg-[#155BC8] hover:text-white transition-all"
        },
        {
          name: "Primary Outline Rounded",
          className: "border-2 border-[#155BC8] text-[#155BC8] hover:bg-[#155BC8] hover:text-white rounded-full transition-all"
        },
        {
          name: "Success Outline",
          className: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
        },
        {
          name: "Warning Outline",
          className: "border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
        },
        {
          name: "Danger Outline",
          className: "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
        }
      ]
    },
    {
      name: "Soft Buttons",
      buttons: [
        {
          name: "Primary Soft",
          className: "bg-[#155BC8]/10 text-[#155BC8] hover:bg-[#155BC8]/20 transition-all"
        },
        {
          name: "Success Soft",
          className: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-all"
        },
        {
          name: "Warning Soft",
          className: "bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all"
        },
        {
          name: "Danger Soft",
          className: "bg-red-100 text-red-600 hover:bg-red-200 transition-all"
        }
      ]
    },
    {
      name: "Icon Buttons",
      buttons: [
        {
          name: "Primary with Icon",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white transition-all flex items-center gap-2",
          icon: "→"
        },
        {
          name: "Outline with Icon",
          className: "border-2 border-[#155BC8] text-[#155BC8] hover:bg-[#155BC8] hover:text-white transition-all flex items-center gap-2",
          icon: "+"
        },
        {
          name: "Circle Icon",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all",
          icon: "✓"
        },
        {
          name: "Soft with Icon",
          className: "bg-[#155BC8]/10 text-[#155BC8] hover:bg-[#155BC8]/20 transition-all flex items-center gap-2",
          icon: "⚡"
        }
      ]
    },
    {
      name: "Special Effects",
      buttons: [
        {
          name: "Scale on Hover",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white hover:scale-105 transition-all"
        },
        {
          name: "Gradient",
          className: "bg-gradient-to-r from-[#155BC8] to-purple-600 hover:from-purple-600 hover:to-[#155BC8] text-white transition-all"
        },
        {
          name: "Glass Effect",
          className: "backdrop-blur-sm bg-white/30 border border-white/50 text-gray-800 hover:bg-white/40 transition-all shadow-lg"
        },
        {
          name: "Neon Effect",
          className: "bg-[#155BC8] text-white shadow-[0_0_15px_rgba(21,91,200,0.5)] hover:shadow-[0_0_25px_rgba(21,91,200,0.8)] transition-all"
        },
        {
          name: "3D Effect",
          className: "bg-[#155BC8] text-white transform hover:-translate-y-1 hover:shadow-lg transition-all"
        }
      ]
    },
    {
      name: "Size Variations",
      buttons: [
        {
          name: "Extra Small",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white text-xs py-1 px-2 transition-all"
        },
        {
          name: "Small",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white text-sm py-1.5 px-3 transition-all"
        },
        {
          name: "Large",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white text-lg py-3 px-6 transition-all"
        },
        {
          name: "Extra Large",
          className: "bg-[#155BC8] hover:bg-[#1247A3] text-white text-xl py-4 px-8 transition-all"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black tracking-tight">Button Style Guide</h1>
        
        <div className="space-y-12">
          {buttonGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">{group.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.buttons.map((button, buttonIndex) => (
                  <div key={buttonIndex} className="space-y-2">
                    <button 
                      className={`w-full px-4 py-2 rounded-md font-medium ${button.className}`}
                    >
                      {button.icon && <span>{button.icon}</span>}
                      {button.name}
                      {button.icon && button.name !== "Circle Icon" && <span>{button.icon}</span>}
                    </button>
                    <p className="text-sm text-gray-500 text-center">{button.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Common Usage Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Form Actions</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#155BC8] text-white rounded-md hover:bg-[#1247A3] transition-all font-medium">
                  Submit
                </button>
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all font-medium">
                  Cancel
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Action Group</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-all font-medium flex items-center gap-2">
                  <span>✓</span> Approve
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all font-medium flex items-center gap-2">
                  <span>×</span> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPreview; 