import { Award, Leaf, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/restaurantData';

export function WhyChooseUs() {
  const iconMap: Record<string, React.ReactNode> = {
    'ChefHat': <Award className="w-6 h-6 text-[#991B1B]" />,
    'Leaf': <Leaf className="w-6 h-6 text-emerald-700" />,
    'HeartHandshake': <HeartHandshake className="w-6 h-6 text-[#B45309]" />,
    'Sparkles': <Sparkles className="w-6 h-6 text-[#D97706]" />,
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FDFBF7] border-b border-[#E8DFD1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>The Andhra Home Foods Promise</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Why Choose Us?
          </h2>

          <p className="text-base text-[#6B4B3E]">
            We pride ourselves on serving food that nourishes both body and soul, staying true to ancestral recipes and uncompromised culinary principles.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((card, idx) => (
            <div
              key={card.id}
              className="group p-6 rounded-xl bg-[#FAF6EE] border border-[#E3D6C3] hover:border-[#B45309]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Subtle card highlight index */}
              <div className="absolute top-4 right-4 text-3xl font-serif font-bold text-[#E8DAC6]/40 pointer-events-none select-none">
                0{idx + 1}
              </div>

              <div>
                <div className="w-12 h-12 rounded-lg bg-[#F4E9D8] border border-[#D9C4A5] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  {iconMap[card.iconName] || <Award className="w-6 h-6 text-[#991B1B]" />}
                </div>

                <div className="text-[11px] font-serif text-[#B45309] font-medium mb-1">
                  {card.telugu}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#2C1810] group-hover:text-[#991B1B] transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-[#5C3D2E] mt-3 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DAC6] flex items-center gap-2 text-xs font-medium text-[#2C1810]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
