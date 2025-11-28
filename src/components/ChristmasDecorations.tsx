export const HangingStars = () => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-around items-start px-8 pt-8 pointer-events-none">
      {/* Star 1 - Yellow */}
      <div className="flex flex-col items-center animate-[swing_3s_ease-in-out_infinite]">
        <div className="w-0.5 h-12 bg-primary/40" />
        <svg viewBox="0 0 50 50" className="w-12 h-12">
          <path
            d="M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z"
            fill="#FFE66D"
            stroke="#FFB800"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Star 2 - Pink */}
      <div className="flex flex-col items-center animate-[swing_2.5s_ease-in-out_infinite_0.3s]">
        <div className="w-0.5 h-16 bg-primary/40" />
        <svg viewBox="0 0 50 50" className="w-10 h-10">
          <path
            d="M25 2 L27 23 L48 25 L27 27 L25 48 L23 27 L2 25 L23 23 Z"
            fill="#FFB3D9"
            stroke="#FF85C0"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Star 3 - Small Yellow */}
      <div className="flex flex-col items-center animate-[swing_2.8s_ease-in-out_infinite_0.6s]">
        <div className="w-0.5 h-10 bg-primary/40" />
        <svg viewBox="0 0 50 50" className="w-8 h-8">
          <path
            d="M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z"
            fill="#FFE66D"
            stroke="#FFB800"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Star 4 - Large Pink Diamond */}
      <div className="flex flex-col items-center animate-[swing_3.2s_ease-in-out_infinite_0.9s]">
        <div className="w-0.5 h-14 bg-primary/40" />
        <svg viewBox="0 0 50 50" className="w-14 h-14">
          <path
            d="M25 2 L27 23 L48 25 L27 27 L25 48 L23 27 L2 25 L23 23 Z"
            fill="#FFB3D9"
            stroke="#FF85C0"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Star 5 - Yellow */}
      <div className="flex flex-col items-center animate-[swing_2.7s_ease-in-out_infinite_1.2s]">
        <div className="w-0.5 h-12 bg-primary/40" />
        <svg viewBox="0 0 50 50" className="w-12 h-12">
          <path
            d="M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z"
            fill="#FFE66D"
            stroke="#FFB800"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

export const GingerbreadMan = () => {
  return (
    <div className="absolute bottom-0 right-8 animate-pulse">
      <img src={`/gb.png`} width={300}/>
    </div>
  );
};

export const FloatingStar = () => {
  return (
    <div className="absolute bottom-0 left-0 animate-pulse pointer-events-none">
      <img src='/stars.png' width={500} />
    </div>
  );
};
