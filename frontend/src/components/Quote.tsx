const Quote = () => {
  return (
    <div
      className="bg-slate-200 h-screen flex
     justify-center flex-col"
    >
      <div className="flex justify-center">
        <div className="max-w-lg text-left text-2xl font-bold">
          <div>
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns. "
          </div>
          <div className="max-w-sm mt-3 text-xl font-bold">
            Jules Winnfield <br />
            <span className="text-base font-light text-gray-600">CEO| Acme INC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
